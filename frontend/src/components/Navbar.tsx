import './Navbar.css'
import {NavLink,useNavigate} from 'react-router-dom'

export default function(){

    const navigate=useNavigate()
    function handleLogout(){
        localStorage.removeItem('token')
        navigate('/login')
    }
    return(
        <nav className="navbar">
            <div className="nav-left">
            <NavLink to="/restaurants" className="logo">
                FoodScout
            </NavLink>
            </div>

            <div className="nav-right">
            <button className="logout-btn" onClick={handleLogout}>
                Logout
            </button>
            </div>
        </nav>
    )
}