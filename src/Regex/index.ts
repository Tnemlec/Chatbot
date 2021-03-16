import pattern from './pattern';
import xregexp from 'xregexp';

export default class PatternHandler{
    matchPattern(message: any, callback: Function){
        let found = pattern.find(item => {
            if(xregexp.test(message.text, xregexp(item.pattern, 'i'))){
                return true
            }
        })
        if(found){
            return callback(this.getResponse(found.intent, this.createEntities(message.text, found.pattern)))
        }
        else{
            return callback({})
        }
    }

    createEntities(message: string, pattern: any){
        return xregexp.exec(message , xregexp(pattern,"i"))
    }

    getResponse(intent: string, entities: any){
        switch (intent) {
            case "salutation":
                return 'Hey 👋'
                break;
            
            case "exit":
                return 'See you later ! 🖐'
                break;
        
            default:
                return "Sorry I didn't understand 🤷‍♂️"
                break;
        }
    }
}