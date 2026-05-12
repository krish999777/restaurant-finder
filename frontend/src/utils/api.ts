import axios from 'axios'

const api = axios.create({
  baseURL:import.meta.env.VITE_BASE_URL
})
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token) {
    config.headers.Authorization = token
  }
  return config
})
export type RatingType={
    _id:string,
    userId:{
        _id:string,
        name:string
    },
    description:string,
    rating:number,
    createdAt:string,
    updatedAt:string
}

export type RestaurantType={
    _id:string,
    name:string,
    description:string,
    categories:string[],
    location:{
        type:"Point",
        coordinates:[number,number]
    },
    address:string,
    avgRating:number,
    sumRating:number,
    ratings:RatingType[]
    createdAt:string,
    updatedAt:string,
    __v:number
}
export async function postLogin(body:{
    email:string,
    password:string
}){
    try{
        const res=await api.post(`/auth/login`,body)
        const { token, user } = res.data
        localStorage.setItem("token", token)
        return user
    }catch(err){
        throw new Error(err.response?.data?.error || "Login failed")
    }
}
export async function postSignup(body:{
    name:string,
    email:string,
    password:string
}){
    try{
        const res=await api.post('/auth/signup',body)
        const {token,user}=res.data
        localStorage.setItem("token", token)
        return user
    }catch(err){
        throw new Error(err.response?.data?.error||'Sign up failed')
    }
}
export async function getAllRestaurants({search,category,page,sort}:{
    search?:string,
    category?:string,
    page?:number,
    sort?:'latest'|'oldest'|'rating'
}){
    let query=''
    if(search){
        query+=`search=${search}`
    }
    if(category){
        query+=`${query?'&':''}category=${category}`
    }
    if(page){
        query+=`${query?'&':''}page=${page}`
    }
    if(sort){
        query+=`${query?'&':''}sort=${sort}`
    }
    try{
        const res=await api.get('/restaurants?'+query)
        return res.data
    }catch(err){
        throw new Error(err.response?.data?.error)
    }
}
export async function getEachRestaurant(id:string){
    try{
        const res=await api.get(`/restaurants/${id}`)
        return res.data
    }catch(err){
        throw new Error(err.response?.data?.error)
    }
}
export async function postRating(id:string,body:{rating:number,description:string}){
    try{
        const res=await api.post(`/restaurants/${id}/rating`,body)
        return res.data
    }catch(err){
        throw new Error(err.response?.data?.error)
    }
}
export async function getNearRestaurants({lat,long,search,category}:{
    lat:number,
    long:number,
    search?:string,
    category?:string
}){
    try{
        let query:string=""
        if(search){
            query+=`&search=${search}`
        }
        if(category){
            query+=`&category=${category}`
        }
        const res=await api.get(`/restaurants/near?lat=${lat}&long=${long}${query}`)
        return res.data
    }catch(err){
        throw new Error(err.response?.data?.error)
    }
}
export async function postRestaurants(body:{
    name:string,
    description:string,
    categories?:string[],
    coordinates:[number,number],
    address:string
}){
    try{
        const res=await api.post('/restaurants',body)
        return res.data
    }catch(err){
        throw new Error(err.response?.data?.error)
    }
}
export async function putEachRestaurant(id:string,body:{
    name:string,
    description:string,
    address:string,
    categories:string[],
    coordinates:[number,number]
}){
    try{
        const res=await api.put(`/restaurants/${id}`,body)
        return res.data
    }catch(err){
        throw new Error(err.response?.data?.error)
    }
}