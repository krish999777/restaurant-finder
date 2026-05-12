import type {Request,Response} from 'express'
import Restaurants from '../models/restaurant.js'
import type {RestaurantType} from '../models/restaurant.js'

type RequestBody={
    name:string,
    description:string,
    categories?:string[]|undefined,
    coordinates:[number,number],
    address:string
}

export async function postRestaurantsController(
    req:Request<{},unknown,RequestBody>,
    res:Response<{restaurant:RestaurantType}|{error:string}>
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
export async function getRestaurantsController(req:Request<null,unknown,unknown,{
    search:string|undefined,
    category:string|undefined,
    page:string|undefined,
    sort:string|undefined
}>,res:Response){
    const {search,category,page,sort}=req.query
    let query:{
        name?:{$regex:RegExp|string},
        categories?:string
    }={}
    let sortOption={}
    const numPage=Math.max(1, Number(page) || 1)
    if(category){
        query.categories=category
    }
    if(search){
        query.name={$regex:new RegExp(search, 'i')}
    }
    if(sort==='latest'){
        sortOption={createdAt:-1}
    }else if(sort==='oldest'){
        sortOption={createdAt:1}
    }else if(sort==="rating"){
        sortOption={sumRating:-1}
    }
    const skip:number=(numPage-1)*10
    const total = await Restaurants.countDocuments(query)
    try{
        const restaurants=await Restaurants.find(query)
        .populate('ratings.userId','name')
        .sort(sortOption)
        .skip(skip)
        .limit(10)
        .lean()
        const updatedRestaurants=restaurants.map(rest=>{
            const sum=rest.sumRating
            const count=rest.ratings.length
            const avg=count===0?0:sum/count
            return {
                ...rest,
                avgRating:avg
            }
        })
        res.status(200).json({
            restaurants:updatedRestaurants,
            total,
            page: numPage,
            pages: Math.ceil(total / 10)
        })
    }catch(err){
        console.log(err)
        res.status(500).json({error:"Internal server error"})
    }
}
export async function getRestaurantsNearController(req:Request<null,unknown,unknown,{
    lat:string,
    long:string,
    radius:string,
    search:string|undefined,
    category:string|undefined
}>,res:Response){
    type Query={
        location:{
            $near:{
                $geometry:{type:'Point',coordinates:[number,number]},
                $maxDistance:number
            }
        },
        name?:{$regex:RegExp|string},
        categories?:string
    }
    let {lat,long,radius,search,category}=req.query
    if(!lat||!long){
        return res.status(400).json({error:'Missing lat,long or radius parameters'})
    }
    if(!radius){
        radius='20000000'
    }
    const numLat=Number(lat)
    const numLong=Number(long)
    const numRadius=Number(radius)
    if(isNaN(numLat)||isNaN(numLong)||isNaN(numRadius)){
        return res.status(400).json({error:'lat,long and radius parameters must be numbers'})
    }
    let query:Query={
            location: {
                $near: {
                    $geometry: { type: "Point", coordinates: [ numLong, numLat ] },
                    $maxDistance: numRadius
                }
            }
        }
    if(search){
        query.name={$regex:new RegExp(search, 'i')}
    }
    if(category){
        query.categories=category
    }
    
    try{
        const restaurants=await Restaurants.find(query)
        .populate('ratings.userId','name')
        .limit(10)
        .lean()
        const updatedRestaurants=restaurants.map(rest=>{
            const sum=rest.sumRating
            const count=rest.ratings.length
            const avg=count===0?0:sum/count
            return {
                ...rest,
                avgRating:avg
            }
        })
        res.status(200).json({
            restaurants:updatedRestaurants
        })
    }catch(err){
        console.log(err)
        res.status(500).json({error:"Internal server error"})
    }
}