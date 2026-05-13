import type {Request,Response} from 'express'
import Restaurant from '../models/restaurant.js'
import mongoose from 'mongoose'

export async function getEachRestaurant(req:Request<{id:string}>,res:Response){
    const {id}=req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error:"invalid id"})
    }
    try{
        const restaurant=await Restaurant.findById(id)
        .populate('ratings.userId','name')
        .lean()
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
         
        return res.status(500).json({error:"Internal server error"})
    }
}
export async function putEachRestaurant(req:Request<{id:string},unknown,{
    name?:string,
    description?:string,
    categories?:string[],
    address?:string,
    coordinates?:[number,number]
}>,res:Response){
    const {id}=req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error:"invalid id"})
    } 
    let {name,description,categories,address,coordinates}=req.body
    try{
        const restaurant=await Restaurant.findById(id)
        if(!restaurant){
            return res.status(404).json({error:"Restaurant not found"})
        }
        restaurant.name=name?name.trim()?name.trim():restaurant.name:restaurant.name
        restaurant.description=description?description.trim()?description.trim():restaurant.description:restaurant.description
        restaurant.categories=categories?categories:restaurant.categories
        restaurant.address=address?address.trim()?address.trim():restaurant.address:restaurant.address
        restaurant.location.coordinates=coordinates?coordinates.length===2?coordinates:restaurant.location.coordinates:restaurant.location.coordinates
        await restaurant.save()
        return res.status(200).json({ restaurant })
    }catch(err){
         
        return res.status(500).json({error:"Internal server error"})
    }   
}
export async function deleteEachRestaurant(req:Request<{id:string}>,res:Response){
    const {id}=req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error:"invalid id"})
    }
    try{
        const restaurant=await Restaurant.findByIdAndDelete(id)
        if(!restaurant){
            return res.status(404).json({error:"Restaurant not found"})
        }
        return res.status(204).send()
    }catch(err){
         
        res.status(500).json({error:"Internal server error"})
    }
}