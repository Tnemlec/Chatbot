from flask import Flask, request, jsonify
import json
import pandas as pd
import math
import os
basePath = os.path.dirname(os.path.abspath(__file__))

app = Flask(__name__)

@app.route('/api/recommand', methods=['POST'])
def index():
    #Check if all necessary data has been passed on
    try:
        user = request.json['user']
    except:
        return 'Bad request, user id is mandatory', 400
            
    try:
        n = request.json['n_recommand']
    except:
        n = 3
    
    if(user and user != ''):
        recommandation = recommand(user, int(n))
        if(recommandation):
            return json.dumps({'recommandation':recommandation}), 200, {'ContentType':'application/json'} 
        else:
            return json.dumps({'Error': 'Songs with no tags provided'}), 400, {'ContentType':'application/json'} 
    else:
        return 'Bad request', 400


def userpreference(user_df, all_genre):
    user_pref = [0 for i in range(len(all_genre))]
    for j in range(len(user_df)):
        for i in range(len(all_genre)):
            user_pref[i] += user_df.loc[j, 'score'] * user_df.iloc[j, i + 5]
    return user_pref

#Give the cosine score based on user_vector and song_vector
def cosine(user_vector, user_vector_squared, song_vector):
    #We can remove the square(song_vector) to the denominator because it is always = 1 because of the normalization
    res = production(user_vector, song_vector)/(user_vector_squared)
    return res

#Calculate numerator value
def production(user_vector, song_vector):
    res = 0.0
    for i in range(len(user_vector)):
        res += user_vector[i] * song_vector[i]
    return res

#Calculate denominator value
def square(vector):
    res = 0.0
    for i in range(len(vector)):
        res += vector[i] * vector[i]
    return math.sqrt(res)


def recommand(user, n):
    #You can find this code detailed in the jupyter notebook
    #Get all the data
    songs = pd.read_json(basePath + '/tracks_tag.json')

    header = ['user_id', 'track_name', 'artist_name', 'score', 'tags']
    data = []
    for song in user:
        data.append([0, song['track_name'], song['artist_name'], song['score'], song['tags']])

    user = pd.DataFrame(data, columns=header)

    #Get all genre
    all_genre = set()

    for elem in songs['tags']:
        for tag in elem:
            all_genre.add(tag)

    for elem in user['tags']:
        for tag in elem:
            all_genre.add(tag)

    all_genre = list(all_genre)

    #Encode tags column to one hot encoding, normalized
    songs[all_genre] = 0
    i = 0
    for tags in songs['tags']:
        for tag in tags:
            songs.loc[i, tag] = 1/math.sqrt(len(tags))
        if(tags == []):
            songs = songs.drop([i])
        i+=1
    songs = songs.reset_index(drop=True)

    user[all_genre] = 0
    i = 0
    for tags in user['tags']:
        for tag in tags:
            user.loc[i, tag] = 1/math.sqrt(len(tags))
        if(tags == []):
            user = user.drop([i])
        i+=1
    user = user.reset_index(drop=True)
    
    if(len(user) == 0):
        return False

    #Compute user preferance based on what he is listening to
    user_profile = userpreference(user, all_genre)

    # Remove songs that are already in library
    song_alredy_in_library = user['track_name']
    song_unlistened = songs[~songs['track_name'].isin(song_alredy_in_library)]

    # We store song name and artist name paired with their score
    song_name = list(song_unlistened['track_name'])
    song_artist = list(song_unlistened['artist_name'])

    #Get score using the cosine distance
    user_vector_squared = square(user_profile)
    scores = songs.apply(lambda x: cosine(user_profile, user_vector_squared, x[3:]), axis = 1)
    
    #Store it in dict
    songsScores = dict()
    for i in range(len(song_name)):
        songsScores[str(song_name[i]) + '|' + str(song_artist[i])] = scores[i]
        
    #Sort dictionnary
    songsScores = {k: v for k, v in sorted(songsScores.items(), key=lambda item: item[1], reverse=True)}
    
    #Return n first
    return {k: songsScores[k] for k in list(songsScores)[:n]}

app.run('0.0.0.0', 8000)