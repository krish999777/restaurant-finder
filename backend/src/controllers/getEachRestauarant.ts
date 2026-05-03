import type {Request,Response} from 'express'
import Restaurant from '../models/restaurant'
import mongoose from 'mongoose'

export async function getEachRestaurant(req:Request<{id:string}>,res:Response){
    const {id}=req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error:"invalid id"})
    }
    try{
        const restaurant=await Restaurant.findById(id).lean()
        if(!restaurant){
            return res.status(404).json({error:"Restaurant not found"})
        }
        const sum=restaurant.sumRating
        const count=restaurant.ratings.length
        const avg=count===0?0:sum/count
        const updatedRestaurants={
            ...restaurant,
            avgRating:avg
        }
        return res.status(200).json({restaurant:updatedRestaurants})
    }catch(err){
        console.log(err)
        return res.status(500).json({error:"Internal server error"})
    }
}