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