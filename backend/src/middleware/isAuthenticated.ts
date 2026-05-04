import type {Response,NextFunction} from 'express'
import jwt from 'jsonwebtoken'

export default function(req:any,res:Response,next:NextFunction){
    const authHeader=req.headers.authorization
    if(!authHeader){
        return res.status(401).json({error:"Not authorized"})
    }
    const parts=authHeader.split(' ')
    if(parts.length!==2||parts[0].toLowerCase()!=='bearer'){
        return res.status(401).json({error:"Not authorized"})
    }
    const token=parts[1]
    const key=process.env.JWT_KEY
    if(!key){
        return res.status(500).json({error:"JWT key missing"})
    }
    try{
        const payload=jwt.verify(token,key)
        req.user=payload
        next()
    }catch(err){
        console.log(err)
        return res.status(401).json({error:"Invalid token"})
    }
}