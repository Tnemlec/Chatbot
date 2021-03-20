import express from 'express';
import lastfm from './lastfm/index';
import FBManager from './FBManager/index';
import dotenv from 'dotenv';
import PatternHandler from './Regex/index'
import Track from './lastfm/track';

const server = express();
const PORT = 3000;

if(server.settings.env === "development"){
    let result = dotenv.config();
    if (result.error) {
        throw result.error
    }
}

let fb_client = new FBManager(process.env.PAGE_ACCESS_TOKEN, process.env.VERIFY_TOKEN);
let api_client = new lastfm();
let pattern_client = new PatternHandler()

server.use(express.json())

server.get('/', async (req, res) => {
    let tracks: Track[] = await api_client.get_top_3("cher");
    let result: string = "";

    tracks.forEach((track: Track) => {
        result += `${track.name}|||`;
    });

    res.send(result);

    // fb_client.registerHook(req, res);
});

server.post('/', (req, res) => {
    // fb_client.getIncommingData(req, res, (data: any) => {
    //     console.log(data)
    //     //Determine the message pattern
    //     pattern_client.matchPattern(data.message, (response: any) => {
    //         if(response){
    //             fb_client.sendTxt(data.sender.id, response).then(mid => {
    //                 console.log(mid)
    //             }).catch(error => {
    //                 console.log(error)
    //             })
    //         }
    //     })
    // })
})

server.listen(PORT, () => {
    console.log("The server is running on port " + PORT)
});