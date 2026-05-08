import './Restaurants.css'
import {useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import {getAllRestaurants} from '../utils/api'
import type {RestaurantType} from '../utils/api'

export default function(){
    const [restaurants,setRestaurants]=useState<{
        restaurants:RestaurantType[],
        pages:number,
        page:number,
        total:number
    }|null>(null)
    const [error,setError]=useState<null|string>(null)
    const [loading,setLoading]=useState<boolean>(false)
    useEffect(()=>{
        async function fetchData(){
            try{
                setLoading(true)
                const d=await getAllRestaurants({})
                setRestaurants(d)
            }catch(err){
                setError(err.message)
            }finally{
                setLoading(false)
            }
        }
        fetchData()
    },[])
    console.log(restaurants)
    return(
        <div>
            {error?<div>{error}</div>:''}
            {!loading&&restaurants?<div className="restaurants-container">
                {restaurants.restaurants.map(rest=>{
                    return(
                            <div key={rest._id} className="each-restaurant-container">
                                <div>{rest.name}</div>
                                <div>{rest.description}</div>
                                <div>{rest.categories.map((cat,ind:number)=><div key={ind}>{cat}</div>)}</div>
                                <div>{rest.avgRating}</div>
                                <Link  to={`/restaurants/${rest._id}`}>View details</Link>
                            </div>
                    )
                })}
            </div>:<div>Loading restaurants...</div>}
        </div>
    )
}