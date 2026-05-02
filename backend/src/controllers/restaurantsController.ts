import type {Request,Response} from 'express'
import Restaurants from '../models/restaurant'
import type {Restaurant} from '../models/restaurant'

type RequestBody={
    name:string,
    description:string,
    categories?:string[]|undefined,
    coordinates:[number,number],
    address:string
}

export async function postRestaurantsController(
    req:Request<null,unknown,RequestBody>,
    res:Response<{restaurant:Restaurant}|{error:string}>
){
    let {name,description,categories,coordinates,address}:RequestBody=req.body
    try{
        if(!name||!description||!coordinates||!address){
            return res.status(400).json({error:"Missing parameters"})
        }
        name=name.trim()
        description=description.trim()
        address=address.trim()
        if(!name||!description||!address){
            return res.status(400).json({error:"Invalid request"})
        }
        if(categories&&(!Array.isArray(categories)||!categories.every(cat=>typeof(cat)==='string'))){
            return res.status(400).json({error:"Invalid categories"})
        }
        if (
            !Array.isArray(coordinates) ||
            coordinates.length !== 2 ||
            typeof coordinates[0] !== "number" ||
            typeof coordinates[1] !== "number"
        ){
            return res.status(400).json({ error: "Invalid coordinates" })
        }
        const restaurant= new Restaurants({
            name,
            description,
            categories:categories||[],
            location:{
                type:"Point",
                coordinates
            },
            address
        })
        await restaurant.save()
        res.status(201).json({restaurant:restaurant})
    }catch(err){
        console.log(err)
        res.status(500).json({error:"Internal server error"})
    }
}
export async function getRestaurantsController(req:Request<null,unknown,unknown,{search:string|undefined,category:string|undefined}>,res:Response){
    const {search,category}=req.query
    let query:{
        name?:{$regex:RegExp|string},
        categories?:string
    }={}
    if(category){
        query.categories=category
    }
    if(search){
        query.name={$regex:new RegExp(search, 'i')}
    }
    try{
        const restaurants=await Restaurants.find(query).lean()
        res.status(200).json({restaurants})
    }catch(err){
        console.log(err)
        res.status(500).json({error:"Internal server error"})
    }
}