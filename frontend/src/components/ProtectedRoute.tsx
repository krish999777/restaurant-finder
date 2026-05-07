import {Navigate} from 'react-router-dom'
import type {JSX} from 'react'
import Navbar from './Navbar'

export default function({children}:{children:JSX.Element}){
    const token=localStorage.getItem('token')
    if(token){
        return (
        <>
            <Navbar/>
            {children}
        </>
        )
    }
    return <Navigate to="/login"/>
}