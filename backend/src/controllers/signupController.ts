import type {Request,Response} from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/user.js'

export async function signupController(req:Request<null,unknown,{
    name:string,
    email:string,
    password:string
}>,res:Response){
    let {name,email,password} = req.body
    if(!name||!email||!password){
        return res.status(400).json({error:"Missing parameters"})
    }
    name=name.trim()
    email=email.trim()
    if(!name||!email){
        return res.status(400).json({error:"Parameters cannot be empty"})
    }
    if (password.length < 6) {
        return res.status(400).json({ error: "Password too short" })
    }
    try{
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ error: "Email already in use" })
        }
        const hashPassword=await bcrypt.hash(password,10)
        const user=new User({
            name,
            password:hashPassword,
            email,
            role:'user'
        })
        await user.save()
        const secret=process.env.JWT_KEY
        if(!secret){
            return res.status(500).json({error:'Internal server error'})
        }
        const token=jwt.sign({
            id:user._id,
            role:user.role
        },secret,{expiresIn:'8h'})
        res.status(201).json({
            token:`BEARER ${token}`,
            user:{
                name,
                email,
                role:'user'
            }
        })
    }catch(err){
        console.log(err)
        res.status(500).json({error:"Internal server error"})
    }

}