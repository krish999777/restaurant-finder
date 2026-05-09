import './EachRestaurant.css'
import {useParams,Link} from 'react-router-dom'
import {useState,useEffect} from 'react'
import type {RestaurantType} from '../utils/api'
import {getEachRestaurant,postRating} from '../utils/api'

export default function(){
    const [error,setError]=useState<string|null>(null)
    const [loading,setLoading]=useState<boolean>(false)
    const [restaurant,setRestaurant]=useState<RestaurantType|null>(null)
    const [isRating,setIsRating]=useState<boolean>(false)
    const [currentRating,setCurrentRating]=useState<number>(0)
    const [ratingLoading,setRatingLoading]=useState<boolean>(false)

    const {id}=useParams()

    async function fetchData(){
        try{
            setError(null)
            setLoading(true)
            const rest:{restaurant:RestaurantType}=await getEachRestaurant(id)
            setRestaurant(rest.restaurant)
        }catch(err){
            setError(err.message)
        }finally{
            setLoading(false)
        }
    }
    useEffect(()=>{
        fetchData()
    },[id])

    async function handleSubmit(e){
        try{
            setRatingLoading(true)
            setError(null)
            e.preventDefault()
            const form=e.target
            const formData=new FormData(form)
            const description=String(formData.get('description'))
            await postRating(id,{description,rating:currentRating||1})
            fetchData()
            setIsRating(false)
        }catch(err){
            setError(err.message)
        }finally{
            setRatingLoading(false)
        }
    }

    return(
    <div className="restaurant-page">

        {loading ? (
            <div className="loading-state">
                Loading restaurant...
            </div>
        ) : ''}

        {error ? (
            <div className="error-box">
                {error}
            </div>
        ) : ''}

        {!loading && restaurant ? (

            <div className="restaurant-wrapper">
                <Link
                    to="/restaurants"
                    className="back-link"
                >
                    ← Back to restaurants
                </Link>

                {/* HEADER */}

                <div className="restaurant-header">

                    <div className="restaurant-header-left">
                        <h1>{restaurant.name}</h1>

                        <div className="categories-container">
                            {restaurant.categories.map((cat,ind:number) => (
                                <span
                                    className="category-tag"
                                    key={ind}
                                >
                                    {cat}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="rating-box">
                        ⭐ {restaurant.avgRating.toFixed(1)}
                    </div>

                </div>

                {/* ABOUT */}

                <div className="restaurant-section">

                    <h2>About</h2>

                    <p className="restaurant-description">
                        {restaurant.description}
                    </p>

                </div>

                {/* REVIEWS */}

                <div className="restaurant-section">

                    <div className="reviews-top">

                        <h2>Reviews</h2>

                        <button
                            className="toggle-review-btn"
                            onClick={() => setIsRating(prevRating => !prevRating)}
                        >
                            {isRating ? 'Cancel' : 'Add review'}
                        </button>

                    </div>

                    {restaurant.ratings.length === 0 ? (
                        <div className="empty-review-state">
                            No reviews yet
                        </div>
                    ) : ''}

                    <div className="reviews-container">

                        {restaurant.ratings.map(rating => {
                            return(
                                <div
                                    key={rating._id}
                                    className="review-card"
                                >

                                    <div className="review-top">

                                        <div className="review-user">
                                            {rating.userId.name}
                                        </div>

                                        <div className="review-rating">
                                            ⭐ {rating.rating}
                                        </div>

                                    </div>

                                    <div className="review-description">
                                        {rating.description}
                                    </div>

                                </div>
                            )
                        })}

                    </div>

                </div>

                {/* ADD REVIEW */}

                {isRating ? (

                    <div className="restaurant-section review-form-section">

                        <h2>Add your review</h2>

                        <form
                            className="review-form"
                            onSubmit={handleSubmit}
                        >

                            <div className="stars-container">

                                <span
                                    onClick={() => setCurrentRating(1)}
                                >
                                    {currentRating >= 1 ? '★' : '☆'}
                                </span>

                                <span
                                    onClick={() => setCurrentRating(2)}
                                >
                                    {currentRating >= 2 ? '★' : '☆'}
                                </span>

                                <span
                                    onClick={() => setCurrentRating(3)}
                                >
                                    {currentRating >= 3 ? '★' : '☆'}
                                </span>

                                <span
                                    onClick={() => setCurrentRating(4)}
                                >
                                    {currentRating >= 4 ? '★' : '☆'}
                                </span>

                                <span
                                    onClick={() => setCurrentRating(5)}
                                >
                                    {currentRating >= 5 ? '★' : '☆'}
                                </span>

                            </div>

                            <textarea
                                required={true}
                                name="description"
                                placeholder="Write your review..."
                            />

                            <button disabled={ratingLoading}>
                                {ratingLoading ? 'Submitting...' : 'Submit review'}
                            </button>

                        </form>

                    </div>

                ) : ''}

            </div>

        ) : ''}
    </div>
)
}