import pattern from './pattern';
import xregexp from 'xregexp';

import LastFm from '../LastFM/index';
import Track from '../LastFM/track';

import fs from 'fs'

export default class PatternHandler{
    api_client: LastFm;

    constructor(api_client: LastFm){
        this.api_client = api_client;
    }

    async matchPattern(message: any, sender_id: any){
        let found = pattern.find(item => {
            if(xregexp.test(message.text, xregexp(item.pattern, 'i'))){
                return true
            }
        })
        if(found){
            return await this.getResponse(found.intent, this.createEntities(message.text, found.pattern), sender_id)
        }
        else{
            return "Sorry I didn't understand 🤷‍♂️"
        }
    }

    createEntities(message: string, pattern: any){
        return xregexp.exec(message , xregexp(pattern,"i"))
    }

    addToDB(tracks_info: any, score: number, users_db: any, id: any){
        let tags_array: Array<string> = [];
        tracks_info.toptags.tag.forEach((tag: any)=> {
            if(tag.name != tracks_info.artist.name){
                tags_array.push(tag.name)
            }
        });
        users_db[id].push({
            track_name: tracks_info.name,
            artist_name: tracks_info.artist.name,
            score: score,
            tags: tags_array
        })
        fs.writeFileSync('./src/userdatabase.json', JSON.stringify(users_db))
    }

    alreadyIn(id: string, users_db: any, song_name: string, artist: string){
        for(let i = 0; i < users_db[id].length; i++){
            if(users_db[id][i].track_name == song_name && users_db[id][i].artist_name == artist){
                return true
            }
        }
        return false
    }

    async getResponse(intent: string, entities: any, sender_id: any){
        switch (intent) {
            case "salutation":
                return 'Hey 👋'
                break;
            
            case "exit":
                return 'See you later ! 🖐'
                break;

            case "get_n_top_songs":
                let answer = ''
                let top_n = null;
                let tracks: Track[];
                if(entities[1]){
                    top_n = parseInt(entities[1])
                }
                let artist_name = entities[2]
                artist_name = artist_name.trim()
                if(top_n != 0 && top_n != null){
                    tracks = await this.api_client.get_top(artist_name, top_n);
                }
                else{
                    tracks = await this.api_client.get_top(artist_name);
                }
                let result: string = "";

                let i = 0
                tracks.forEach((track: Track) => {
                    i+=1
                    result += `${i} - ${track.name}\n`;
                });

                if(top_n != 0 && top_n != null){
                    answer = `Here are the top ${top_n} songs from ${artist_name}\n${result}`
                }
                else{
                    answer = `Here are the top 3 songs from ${artist_name}\n${result}`
                }

                return answer
                break;
        
            case 'add_track_to_mid':
                //Read user file
                let data = fs.readFileSync('./src/userdatabase.json')                     
                let users_db = JSON.parse(data.toString())
                //Check if user is already in database
                let song_name = entities[1]
                let artist = entities[2]
                if(users_db[sender_id]){
                    console.log('User exist')
                }
                else{
                    console.log('User does not exist')
                    users_db[sender_id] = []
                }

                //Let's now find the user track info
                if(song_name && artist && song_name != '' && artist != ''){
                    if(entities[3] && parseFloat(entities[3]) <= 10 && parseFloat(entities[3]) >= 0){
                        let track_info = await this.api_client.get_track_info_tag(song_name, artist)
                        if(track_info){
                            if(!this.alreadyIn(sender_id, users_db, track_info.name, track_info.artist.name)){
                                this.addToDB(track_info, parseFloat(entities[3]), users_db, sender_id)
                                return 'Successfully added to your library 👍'
                            }
                            else{
                                return 'This song is already in your library 😉'
                            }
                        }
                        else{
                            return "Sorry I couldn't find any result.. 🤷‍♂️"
                        }                        
                    }
                    else{
                        return "Sorry, the score must be between 0 and 10 😥"
                    }
                }
                else{
                    return "Sorry I believe this is a wrong song name or artist name 🤷‍♂️"
                }
                break;
            
            default:
                return "Sorry I didn't understand 🤷‍♂️"
                break;
        }
    }
}