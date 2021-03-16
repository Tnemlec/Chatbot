import express = require("express");
import lastfm from "./lastfm/index";
import bodyparser from 'body-parser';
import FBManager from './FBManager/index';

const server = express()
const PORT = 3000

let fb_client = new FBManager();
let api_client = new lastfm()

server.get('/', (req, res) => {
    
})

server.listen(PORT, () => {
    console.log("The server is running on port " + PORT)
})