import "./Login.css"
import { useState } from "react"
import type { JSX,SubmitEvent } from "react"
import { postLogin } from "../utils/api"
import { useNavigate,Link } from "react-router-dom"

export default function (): JSX.Element {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  
  async function handleSubmit(e:SubmitEvent):Promise<void>{
        setLoading(true)
        setError(null)
        e.preventDefault()
        const form:HTMLFormElement=e.target
        const formData=new FormData(form)
        const email=String(formData.get('email'))
        const password=String(formData.get('password'))
        try{
            await postLogin({email,password})
            navigate('/restaurants')
        }catch(err:any){
            setError(err.message)
        }finally{
            setLoading(false)
        }
    }
    return (
  <div className="auth-layout">
    
    <div className="auth-left">

      <div className="brand">
        <div className="logo-box" />
        <span>FoodScout</span>
      </div>

      <div className="auth-content">
        <h1>Welcome back</h1>
        <p className="subtitle">Please enter your details</p>

        {error && <div className="error">{error}</div>}

        <form onSubmit={handleSubmit} className="form">

          <div className="field">
            <label>Email address</label>
            <input type="email" name="email" required />
          </div>

          <div className="field">
            <label>Password</label>
            <input type="password" name="password" required minLength={6} />
          </div>

          <button className="primary-btn" disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </button>

          <p className="signup">
            Dont have an account? <Link className="link" to="/signup">Sign up</Link>
          </p>

        </form>
      </div>
    </div>

    <div className="auth-right">
      <div className="visual-layer" />

      <div className="visual-content">
        <h2>Discover better dining</h2>
        <p>
          Explore curated restaurants, read real reviews, and find your next meal.
        </p>

        <div className="floating-ui">
          <div className="circle" />
          <div className="circle" />
          <div className="circle" />
        </div>
      </div>
    </div>

  </div>
)
}