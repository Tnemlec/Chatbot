import {Request, Response} from 'express';

export default class FBManager{
    pageAccessToken: any;
    VerifyToken: any;

    constructor(pageAccessToken: any, VerifyToken: any){
        if(pageAccessToken == null || VerifyToken == null){
            throw new Error("Null argument in FBManager")
        }else{
            this.pageAccessToken = pageAccessToken
            this.VerifyToken = VerifyToken
        }
    }

    registerHook(req: Request, res: Response){
        console.log(typeof(req))
        console.log(typeof(res))
        const params = req.query
        const mode = params['hub.mode']
        const token = params['hub.verify_token']
        const challenge = params['hub.challenge']
        try{
            if(mode == 'subscribe' && token == this.VerifyToken){
                console.log('WebHook registered')
                return res.send(challenge)
            } else {
                throw "Could not register webhook !"
                return res.sendStatus(200)
            }
        } catch (e){
            console.log(e)
        }
    }
}