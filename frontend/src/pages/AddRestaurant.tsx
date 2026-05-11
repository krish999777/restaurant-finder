import './AddRestaurant.css'
import {Link} from 'react-router-dom'
import {postRestaurants} from '../utils/api'
import RestaurantForm from '../components/RestaurantForm'


export default function(){

    return(
    <div className="add-restaurant-page">
        <Link
            to="/restaurants"
            className="back-link"
        >
            ← Back to restaurants
        </Link>

        <div className="add-restaurant-wrapper">

            <div className="page-header">
                <h1>Add Restaurant</h1>

                <p>
                    Create a new restaurant listing and choose its exact location on the map.
                </p>
            </div>
            <RestaurantForm
                postFunction={postRestaurants}
                type='add'
            />
        </div>
    </div>
)
}