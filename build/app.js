"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var index_1 = __importDefault(require("./lastfm/index"));
var server = express();
var PORT = 3000;
var api_client = new index_1.default();
server.get('/', function (req, res) {
    res.send(api_client.print_hello());
});
server.listen(PORT, function () {
    console.log("The server is running on port " + PORT);
});
