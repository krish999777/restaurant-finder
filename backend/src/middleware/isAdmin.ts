import type {Response,NextFunction} from 'express'

export default function(req:any,res:Response,next:NextFunction){
    if(!req.user||req.user.role!=='admin'){
        return res.status(403).json({error:"Not authorized"})
    }
    next()
}