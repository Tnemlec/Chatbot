import {Request, Response} from 'express';
import axios from 'axios';

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

    getIncommingData(req: Request, res: Response, callback: Function){
        res.sendStatus(200)
        if(req.body.object == 'page' && req.body.entry){
            let data = req.body
            data.entry.forEach((entry: any) => {
                entry.messaging.forEach((messageObj: any) => {
                    return callback(messageObj)
                });
            });
        }
    }

    sendMessage(payload: any){
        console.log(payload)
        return new Promise((resolve, reject) => {
            axios.post('https://graph.facebook.com/v9.0/me/messages?access_token=' + this.pageAccessToken, payload).then(response => {
                resolve({
                    mid: response.data.message_id
                })
            }).catch(error => {
                console.log(error.request)
                reject(error)
            })
        })
    }

    sendTxt(id: string, message: string, messaging_type = 'RESPONSE'){
        let obj = {
            messaging_type,
            recipient: {id},
            message: {text: message}
        }
        return this.sendMessage(obj)
    }
}