import express = require("express");
import lastfm from "./lastfm/index";
import bodyparser from 'body-parser';
import FBManager from './FBManager/index';
import dotenv from "dotenv";

const server = express();
const PORT = 3000;

if(server.settings.env === "development"){
    let result = dotenv.config();
    if (result.error) {
        throw result.error
    }
}

//let fb_client = new FBManager();
let api_client = new lastfm();

server.get('/', (req, res) => {
});

server.listen(PORT, () => {
    console.log("The server is running on port " + PORT)
});