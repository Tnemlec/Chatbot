import express = require("express");
import lastfm from "./lastfm/index";
import bodyparser from 'body-parser';

const server = express()
const PORT = 3000

let api_client = new lastfm()

server.get('/', (req, res) => {
    res.send(api_client.get_track_info("believe", "cher"))
})

server.listen(PORT, () => {
    console.log("The server is running on port " + PORT)
})