import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ProtectedRoute from './components/ProtectedRoute'
import Restaurants from './pages/Restaurants'

export default function(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/restaurants" element={
          <ProtectedRoute>
            <Restaurants/>
          </ProtectedRoute>
          }/>
      </Routes>
    </BrowserRouter>
  )
}
