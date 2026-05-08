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
// {
//     "userId": {
//         "_id": "69f89bb6d1a3695b33bf66c0",
//         "name": "admin"
//     },
//     "description": "Cheese tease was the best",
//     "rating": 5,
//     "_id": "69f983605c0f6a3d61da55bc",
//     "createdAt": "2026-05-05T05:42:56.962Z",
//     "updatedAt": "2026-05-05T05:42:56.962Z"
// }