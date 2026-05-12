import './EditRestaurants.css'
import {useState,useEffect} from 'react'
import {useParams,Link} from 'react-router-dom'
import RestaurantForm from '../components/RestaurantForm'
import type {RestaurantType} from '../utils/api'
import {getEachRestaurant,putEachRestaurant} from '../utils/api'

export default function(){
    const [restaurant,setRestaurant]=useState<null|RestaurantType>(null)
    const [error,setError]=useState<null|string>(null)
    const [loading,setLoading]=useState<boolean>(false)

    const {id}=useParams()

    useEffect(()=>{
        async function fetchData(){
            try{
                setLoading(true)
                setError(null)
                const data=await getEachRestaurant(id)
                setRestaurant(data.restaurant)
            }catch(err){
                setError(err.message)

            }finally{
                setLoading(false)
            }
        }
        fetchData()
    },[])

    return(
        <div className="edit-restaurant-page">  
            <div className="edit-restaurant-wrapper">   
                <Link
                    className="back-link"
                    to={`/restaurants/${id}`}
                >
                    ← Back to restaurant
                </Link> 
                <div className="edit-header">   
                    <div>
                        <span className="edit-badge">
                            Admin Panel
                        </span> 
                        <h1>Edit Restaurant</h1>    
                        <p>
                            Update restaurant details, categories, and location.
                        </p>
                    </div>  
                </div>  
                {loading ? (
                    <div className="loading-state">
                        Loading restaurant details...
                    </div>
                ) : null}   
                {error ? (
                    <div className="error-state">
                        {error}
                    </div>
                ) : null}   
                {restaurant ? (
                    <div className="edit-form-card">    
                        <RestaurantForm
                            postFunction={putEachRestaurant}
                            type="edit"
                            id={id}
                            name={restaurant.name}
                            description={restaurant.description}
                            address={restaurant.address}
                            categories={restaurant.categories}
                            coordinates={restaurant.location.coordinates}
                        />  
                    </div>
                ) : null}   
            </div>  
        </div>
    )
}