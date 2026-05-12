import {Navigate} from 'react-router-dom'
import {getPayload} from '../utils/jwt'

export default function(){
    const token=localStorage.getItem('token')
    if(!token){
        return <Navigate to="/login"/>
    }
    const payload=getPayload()
    if(payload.role){
        return <Navigate to="/restaurants"/>
    }
}