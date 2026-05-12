import type {Request,Response} from 'express'
import Restaurant from '../models/restaurant.js'
import mongoose from 'mongoose'

type ratingBody={
    rating:number,
    description:string
}

export async function postRatingController(req:Request<{id:string},unknown,ratingBody>,res:Response){
    const {id}=req.params
    let {rating,description}:ratingBody=req.body
    const user=req.user
    if(!user){
        return res.status(401).json({error:"Not authorized"})
    }
    const userId=user.id
    if(!id||!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error:"Invalid id"})
    }
    if(!rating||!description){
        return res.status(400).json({error:"Missing parameters"})
    }
    if(rating>5||rating<1){
        return res.status(400).json({error:"Invalid rating"})
    }
    description=description.trim()
    rating=Number(rating)
    if(!description||isNaN(rating)){
        return res.status(400).json({error:"Invalid parameters"})
    }
    try{
        let restaurant=await Restaurant.findById(id)//This can cause a race condition. i know it but 
        if(!restaurant){//i have compromised it for additional type safety provided by mongoose
            return res.status(404).json({error:"Restaurant not found"})
        }
        const hasRated=restaurant.ratings.some(rating=>{
            return rating.userId.equals(userId)
        })
        if(hasRated){
            return res.status(400).json({error:"Cannot rate restaurant twice"})
        }
        restaurant.sumRating=restaurant.sumRating?restaurant.sumRating+rating:rating
        restaurant.ratings.push({
            rating,
            userId,
            description
        })
        await restaurant.save()
        res.status(201).json({rating:{
            rating,
            userId,
            description
        }})
    }catch(err){
        console.log(err)
        res.status(500).json({error:"Internal server error"})
    }
}