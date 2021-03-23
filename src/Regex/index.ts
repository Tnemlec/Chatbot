import pattern from './pattern';
import xregexp from 'xregexp';

import LastFm from '../LastFM/index';
import Track from '../LastFM/track';

export default class PatternHandler {
    api_client: LastFm;

    constructor(api_client: LastFm) {
        this.api_client = api_client;
    }

    async matchPattern(message: any) {
        let found = pattern.find(item => {
            if (xregexp.test(message.text, xregexp(item.pattern, 'i'))) {
                return true;
            }
        })
        if (found) {
            return await this.getResponse(found.intent, this.createEntities(message.text, found.pattern));
        }
        else {
            return "Sorry I didn't understand 🤷‍♂️";
        }
    }

    createEntities(message: string, pattern: any) {
        return xregexp.exec(message, xregexp(pattern, "i"));
    }

    async getResponse(intent: string, entities: any) {
        let number: number;
        let name: string;

        switch (intent) {
            case "salutation":
                return 'Hey 👋';

            case "exit":
                return 'See you later ! 🖐';

            case "get_n_top_songs":
                let answer: string = '';
                let top_n = null;
                let tracks: Track[];
                if (entities[1]) {
                    top_n = parseInt(entities[1]);
                }
                let artist_name = entities[2]
                artist_name = artist_name.trim()
                if (top_n != 0 && top_n != null) {
                    tracks = await this.api_client.get_top(artist_name, top_n);
                }
                else {
                    tracks = await this.api_client.get_top(artist_name);
                }
                let result: string = "";

                let i: number = 0;
                tracks.forEach((track: Track) => {
                    i += 1
                    result += `${i} - ${track.name}\n`;
                });

                answer = `Here are the top ${top_n != 0 && top_n != null ? top_n : 3} songs from ${artist_name}\n${result}`;

                return answer;
            case "search_songs":
                number = entities.number ?? 3;
                name = entities.name;
                if (name)
                    return "Sorry, but the name is empty 🤷‍♂️";

                const artists: string[] = await this.api_client.search_artists(name, number);
                artists.map((value, index) => `${index}.${value}`);

                return `Here are the ${number} artists searched:\n${artists.join('\n')}`;

            case "search_artists":
                number = entities.number ?? 3;
                name = entities.name;
                if (name)
                    return "Sorry, but the name is empty 🤷‍♂️";

                const songs: Track[] = await this.api_client.search_tracks(name, number);
                songs.map((value, index) => `${index}.${value}`);

                return `Here are the ${number} songs searched:\n${songs.join('\n')}`;

            default:
                return "Sorry I didn't understand 🤷‍♂️";
        }
    }
}