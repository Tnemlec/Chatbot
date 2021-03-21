import pattern from './pattern';
import xregexp from 'xregexp';

import Track from '../lastfm/track';
import LastFm from '../lastfm/index';

export default class PatternHandler{
    api_client: LastFm;

    constructor(api_client: LastFm){
        this.api_client = api_client;
    }

    async matchPattern(message: any){
        let found = pattern.find(item => {
            if(xregexp.test(message.text, xregexp(item.pattern, 'i'))){
                return true
            }
        })
        if(found){
            return await this.getResponse(found.intent, this.createEntities(message.text, found.pattern))
        }
        else{
            return "Sorry I didn't understand 🤷‍♂️"
        }
    }

    createEntities(message: string, pattern: any){
        return xregexp.exec(message , xregexp(pattern,"i"))
    }

    async getResponse(intent: string, entities: any){
        switch (intent) {
            case "salutation":
                return 'Hey 👋'
                break;
            
            case "exit":
                return 'See you later ! 🖐'
                break;

            case "get_top_artist":
                let tracks: Track[] = await this.api_client.get_top_3("cher");
                let result: string = "";

                tracks.forEach((track: Track) => {
                    result += `${track.name}|||`;
                });
                return "Here is the top 3 artists\n" + result
                break;
        
            default:
                return "Sorry I didn't understand 🤷‍♂️"
                break;
        }
    }
}