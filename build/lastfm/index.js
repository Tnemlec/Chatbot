"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var LastFm = /** @class */ (function () {
    function LastFm() {
        this.apiKey = "b8b649f9b6b0b68aea290087830903ce";
    }
    LastFm.prototype.get_track_info = function (name, artist) {
        this.make_request("track.getInfo", { artist: artist, track: name });
        return "";
    };
    LastFm.prototype.make_request = function (method, parameters) {
        axios_1.default.get("http://ws.audioscrobbler.com/2.0/?method=" + method + "&api_key=" + this.apiKey + "&format=json", { params: parameters }).then(console.log).catch(console.log);
    };
    return LastFm;
}());
exports.default = LastFm;
