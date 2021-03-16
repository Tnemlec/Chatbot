import axios from 'axios';

export default class LastFm {
    apiKey: string;

    constructor() {
        this.apiKey = process.env.LASTFM_KEY ?? '';
    }

    public async get_top_3(artiste_name: string): Promise<string> {
        let data = await this.make_request('artist.gettoptracks', {artist: artiste_name, limit: 5});
        
        return JSON.stringify(data);
    }

    public async get_track_info(name: string, artist: string): Promise<string> {
        let data = await this.make_request('track.getInfo', { artist: artist, track: name });
        return JSON.stringify(data);
    }

    private async make_request(method: string, parameters: object): Promise<object> {
        let resp = await axios.get(`http://ws.audioscrobbler.com/2.0/?method=${method}&api_key=${this.apiKey}&format=json`, { params: parameters });
        return resp.data;
    }
}
