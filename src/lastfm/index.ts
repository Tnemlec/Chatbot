import axios from 'axios';

export default class LastFm {
    apiKey: string;

    constructor() {
        this.apiKey = process.env.LASTFM_KEY || "";
    }
    
    public get_track_info(name: string, artist: string): string {
        this.make_request("track.getInfo", { artist: artist, track: name });
        return "";
    }

    make_request(method: string, parameters: object): any {
        axios.get(`http://ws.audioscrobbler.com/2.0/?method=${method}&api_key=${this.apiKey}&format=json`, { params: parameters }).then( (res) => {
            return res.data;
        }
        ).catch(console.log);
    }
}
