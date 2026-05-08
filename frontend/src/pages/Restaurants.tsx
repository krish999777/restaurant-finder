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
    const [search,setSearch]=useState<string|null>(null)
    const [page,setPage]=useState<number>(1)
    const [sort,setSort]=useState<'latest'|'oldest'|'rating'|null>(null)
    const [category,setCategory]=useState<string>(null)

    useEffect(()=>{
        async function fetchData(){
            try{
                setLoading(true)
                const d=await getAllRestaurants({
                    search,
                    page,
                    sort,
                    category
                })
                setRestaurants(d)
            }catch(err){
                setError(err.message)
            }finally{
                setLoading(false)
            }
        }
        fetchData()
    },[search,page,sort,category])

    function handleSearchChange(e){
        const value=e.target.value
        setSearch(value)
        setPage(1)
    }
    function handleCategoryChange(e){
        const value=e.target.value
        if(value==='all'){
            setCategory(null)
        }else{
            setCategory(value)
        }
        setPage(1)
    }

    return(
    <div className="restaurants-page">

        <div className="filters-container">

            <div className="search-wrapper">
                <input
                    type="text"
                    placeholder="Search restaurants..."
                    onChange={handleSearchChange}
                />
            </div>

            <div className="sort-buttons">
                <button
                    className={sort === 'latest' ? 'active-sort' : ''}
                    onClick={() => setSort('latest')}
                >
                    Latest
                </button>

                <button
                    className={sort === 'oldest' ? 'active-sort' : ''}
                    onClick={() => setSort('oldest')}
                >
                    Oldest
                </button>

                <button
                    className={sort === 'rating' ? 'active-sort' : ''}
                    onClick={() => setSort('rating')}
                >
                    Ratings
                </button>
            </div>

            <select onChange={handleCategoryChange}>
                <option value="all">All categories</option>
                <option value="veg">Veg</option>
                <option value="fast-food">Fast-food</option>
                <option value="cafe">Cafe</option>
            </select>

        </div>

        {error ? <div className="error-box">{error}</div> : ''}

        {!loading && restaurants ? (

            <div className="restaurants-container">

                {restaurants.restaurants.length === 0 ? (
                    <div className="empty-state">
                        No restaurants found
                    </div>
                ) : ''}

                {restaurants.restaurants.map(rest => {
                    return(
                        <Link
                            key={rest._id}
                            to={`/restaurants/${rest._id}`}
                            className="restaurant-link"
                        >
                            <div className="each-restaurant-container">

                                <div className="restaurant-top">
                                    <h2>{rest.name}</h2>

                                    <div className="rating-pill">
                                        ⭐ {rest.avgRating.toFixed(1)}
                                    </div>
                                </div>

                                <p className="restaurant-description">
                                    {rest.description}
                                </p>

                                <div className="categories-container">
                                    {rest.categories.map((cat,ind:number) =>
                                        <span
                                            className="category-tag"
                                            key={ind}
                                        >
                                            {cat}
                                        </span>
                                    )}
                                </div>

                            </div>
                        </Link>
                    )
                })}

                <div className="pagination-container">

                    {page > 1 ? (
                        <button
                            className="pagination-btn"
                            onClick={() => setPage(prevPage => prevPage - 1)}
                        >
                            ←
                        </button>
                    ) : (
                        <div />
                    )}

                    <div className="page-number">
                        Page {page}
                    </div>

                    {page < restaurants.pages ? (
                        <button
                            className="pagination-btn"
                            onClick={() => setPage(prevPage => prevPage + 1)}
                        >
                            →
                        </button>
                    ) : (
                        <div />
                    )}

                </div>

            </div>

        ) : (
            <div className="loading-state">
                Loading restaurants...
            </div>
        )}
    </div>
)
}