<h1 align="center">
  <br>
   <img src="logo.png"/>
  <br>
</h1>

## Introduction
This chatbot is about music. You can ask him information about an artist, music and even ask him to recommend songs for you based on your library.
You can also look for the n best trending song.
This chatbot is based on the [LastFM](https://www.last.fm/) API. [LastFM](https://www.last.fm/) is a music website that tracks the listening of his users across multiple platform (*Spotify, Deezer, Tidal, …*) that allow him to build a strong and reliable dataset.
This bot is available on Facebook Messenger, on [ours Facebook page](https://www.facebook.com/Tryingchatbothere-106592898050484) !

It may not be running right know due to deployment issue, but you can watch the video to be sure that it is working!

## Requirements
* [Python](https://www.python.org/)
* [Node.js](https://nodejs.org/en/)

## How to use it ?
The chatbot is divided in **2 parts**. The Facebook messenger platform and the recommender system. The Facebook messenger is made in [TypeScript](https://www.typescriptlang.org/) which is a typed version of JavaScript and the recommender system is made in python, so we had to make an external API to link both.
So, if you want to use the chatbot at home you will need to follow those steps:
- Get a Facebook Messenger app setup on the Facebook developers’ platform, to get a page token.
- Get a [LastFM](https://www.last.fm/) API key.
- Create a .env file following the [.env.example](/.env.example) file
- You can now run the chatbot with the command “npm run start” that will run the app and the python api
- Finally register the webhook to your app with the verify token you choose at the creation of your .env file.

**Your app is now up and running!**

## Demonstration
[![Chatbot](https://img.youtube.com/vi/PCf6l4FWhtE/0.jpg)](https://www.youtube.com/watch?v=PCf6l4FWhtE)

## All the command you can try
**Hello:**
![](/screenshots/hello.jpg)

**Bye:**
![](/screenshots/bye.jpg)

**Top songs:** *number(optional)* best songs from *artist_name*
- *User*: "What are the 5 best songs from the beatles ?"
- *Bot*: "Here are the top 5 songs from the beatles:
    1. Come Together
    2. Let It Be
    3. Yesterday
    4.  Help!
    5.  Here Comes the Sun"

**Song search:** *number(optional)* songs that contain *song_name*
![](/screenshots/search_songs.jpg)
   
**Artist search:** *number(optional)* artists that contain *artist_name*
- *User*: 'Search 5 artists that contain beatles'
- *Bot*: "Here are the 5 artists found:
    1. The Beatles
    2. wu tang vs the beatles
    3. #1 Beatles Now
    4. The Beatles Tribute Band
    5. The Beatles Recovered Band"
   
**Adding a recommendation:** add *song_name* - *artist_name* - *score (between 0 to 10)*
- *User*: 'add Take on Me - a ha - 10'
- *Bot*: 'Successfully added to your library

**Recommendation:**
- *User*: 'recommand'
- *Bot*: 'I can recommand you:
1 - Billie Jean by Michael Jackson with a confidence of 88.13052984784633%
2 - Dancing Queen by ABBA with a confidence of 74.9109503706694%
3 - Beat It by Michael Jackson with a confidence of 70.50442387827707%'