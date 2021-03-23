import axios from 'axios';
import Track from './track';

export default class LastFm {
    apiKey: string;

    constructor() {
        this.apiKey = process.env.LASTFM_KEY ?? '';
    }

    public async get_top(artiste_name: string, n = 3): Promise<Track[]> {
        let data: any = await this.make_request('artist.gettoptracks', { artist: artiste_name, limit: n });
        let tracks: Track[] = [];

        data.toptracks.track.forEach((el: any) => {
            tracks.push(new Track(el.name, el.artist.name));
        });

        return tracks;
    }

    public async search_artists(name: string, n=3): Promise<string[]> {
        let data: any = await this.make_request('artist.search', {artist: name, limit: n});
        let names: string[] = [];

        data.results.artistmatches.artist.forEach((el: any) => {
            names.push(el.name);
        });

        return names;
    }

    public async search_tracks(name: string, n = 3): Promise<Track[]> {
        let data: any = await this.make_request('track.search', {track: name, limit: n});
        let tracks: Track[] = [];

        data.results.trackmatches.track.forEach((el: any) => {
            tracks.push(new Track(el.name, el.artist));
        });

        return tracks;
    }

    public async get_track_info(name: string, artist: string): Promise<Track> {
        let data = await this.make_request('track.getInfo', { artist: artist, track: name });
        return new Track(data.track.name, data.track.artist.name);
    }

    public async get_track_info_tag(name: string, artist: string): Promise<any> {
        let data = await this.make_request('track.getInfo', { artist: artist, track: name });
        return data.track
    }

    private async make_request(method: string, parameters: object): Promise<any> {
        let resp = await axios.get(`http://ws.audioscrobbler.com/2.0/?method=${method}&api_key=${this.apiKey}&format=json`, { params: parameters });
        return resp.data;
    }
}
