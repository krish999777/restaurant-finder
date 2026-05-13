import type {Request,Response} from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/user.js'

export async function loginController(req:Request,res:Response){
    let {email,password}=req.body
    if(!email||!password){
        return res.status(400).json({error:"Missing parameters"})
    }
    email=email.trim()
    if(!email){
        return res.status(400).json({error:"Email cannot be empty"})
    }
    if (typeof(password)!=="string"){
        return res.status(400).json({ error: "Invalid input" })
    }
    try{
        const user=await User.findOne({email}).lean()
        if(!user){
            return res.status(401).json({error:"Email not found"})
        }
        const isValidPassword=await bcrypt.compare(password,user.password)
        if(!isValidPassword){
            return res.status(401).json({error:"Invalid password"})
        }
        const key=process.env.JWT_KEY
        if(!key){
            return res.status(500).json({error:"JWT key not present"})
        }
        const token=jwt.sign({
            id:user._id,
            role:user.role
        },key,{expiresIn:'8h'})
        return res.status(200).json({
            token:`BEARER ${token}`,
            user:{
                name:user.name,
                email:user.email,
                role:user.role
            }
        })
    }catch(err){
         
        res.status(500).json({error:"Internal server error"})
    }
}