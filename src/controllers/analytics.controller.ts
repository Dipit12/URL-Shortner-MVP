import {Request,Response} from 'express'
import URLSchema from '../models/URLSchema.js';

export const getAnalytics = async (req:Request,res:Response) =>{
    const {shortenURL} = req.params;
    try{
        const data = await URLSchema.findOne({ shortURL: shortenURL });
        if(data){
            const count = data.timeStamps.length;
            return res.status(200).json({
                msg:"Count is ",count
            })
        }
        res.status(400).json({
            msg:"Short URL not found"
        })
    }catch(err){
        res.status(500).json({
            msg:"Internal server error"
        })
    }
}