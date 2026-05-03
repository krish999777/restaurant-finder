import type {Request,Response} from 'express'
import Restaurant from '../models/restaurant'
import mongoose from 'mongoose'

type ratingBody={
    rating:number,
    name:string,//keep userId later once i create user schema and auth
    description:string
}

export async function postRatingController(req:Request<{id:string},unknown,ratingBody>,res:Response){
    const {id}=req.params
    let {name,rating,description}:ratingBody=req.body
    
    if(!id||!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error:"Invalid id"})
    }
    if(!name||!rating||!description){
        return res.status(400).json({error:"Missing parameters"})
    }
    if(rating>5||rating<1){
        return res.status(400).json({error:"Invalid rating"})
    }
    name=name.trim()
    description=description.trim()
    rating=Number(rating)
    if(!name||!description||isNaN(rating)){
        return res.status(400).json({error:"Invalid parameters"})
    }
    try{
        let restaurant=await Restaurant.findById(id)//This can cause a race condition. i know it but 
        if(!restaurant){//i have compromised it for additional type safety provided by mongoose
            return res.status(404).json({error:"Restaurant not found"})
        }
        restaurant.sumRating=restaurant.sumRating?restaurant.sumRating+rating:rating
        restaurant.ratings.push({
            rating,
            name,
            description
        })
        await restaurant.save()
        res.status(201).json({rating:{
            rating,
            name,
            description
        }})
    }catch(err){
        console.log(err)
        res.status(500).json({error:"Internal server error"})
    }
}