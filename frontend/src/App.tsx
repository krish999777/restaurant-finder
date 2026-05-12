import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ProtectedRoute from './components/ProtectedRoute'
import Restaurants from './pages/Restaurants'
import EachRestaurant from './pages/EachRestaurant'
import AddRestaurant from './pages/AddRestaurant'
import EditRestaurant from './pages/EditRestaurants'
import Root from './pages/Root'

export default function(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/restaurants" element={
          <ProtectedRoute>
            <Restaurants/>
          </ProtectedRoute>
        }/>
        <Route path="/restaurants/:id" element={
          <ProtectedRoute>
            <EachRestaurant/>
          </ProtectedRoute>
        }/>
        <Route path="/addrestaurant" element={
          <ProtectedRoute>
            <AddRestaurant/>
          </ProtectedRoute>
        }/>
        <Route path="/editrestaurant/:id" element={
          <ProtectedRoute>
            <EditRestaurant/>
          </ProtectedRoute>
        }/>
      </Routes>
    </BrowserRouter>
  )
}
