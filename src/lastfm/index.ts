import axios from 'axios';
import Track from './track';

export default class LastFm {
    apiKey: string;

    constructor() {
        this.apiKey = process.env.LASTFM_KEY ?? '';
    }

    public async get_top_3(artiste_name: string): Promise<Track[]> {
        let data: any = await this.make_request('artist.gettoptracks', {artist: artiste_name, limit: 3});
        let tracks: Track[] = [];

        data.toptracks.track.forEach((el: any) => {
            tracks.push(new Track(el.name, el.artist.name));
        });
        
        return tracks;
    }

    public async get_track_info(name: string, artist: string): Promise<Track> {
        let data = await this.make_request('track.getInfo', { artist: artist, track: name });
        return new Track(data.track.name, data.track.artist.name);
    }

    private async make_request(method: string, parameters: object): Promise<any> {
        let resp = await axios.get(`http://ws.audioscrobbler.com/2.0/?method=${method}&api_key=${this.apiKey}&format=json`, { params: parameters });
        return resp.data;
    }
}
