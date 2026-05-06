import {useState} from 'react'
import type {JSX,SubmitEvent} from 'react'
import {useNavigate,Link} from 'react-router-dom'
import {postSignup} from '../utils/api'

export default function():JSX.Element{
    const [error,setError]=useState<null|string>(null)
    const [loading,setLoading]=useState<boolean>(false)

    const navigate=useNavigate()

    async function handleSubmit(e:SubmitEvent){
        setError(null)
        setLoading(true)
        e.preventDefault()
        const form:HTMLFormElement=e.target
        const formData=new FormData(form)
        const name=String(formData.get('name'))
        const email=String(formData.get('email'))
        const password=String(formData.get('password'))
        try{
            await postSignup({name,email,password})
            navigate('/restaurants')
        }catch(err){
            setError(err.message)
        }finally{
            setLoading(false)
        }
    }

   return (
  <div className="auth-layout">
    {/* LEFT */}
    <div className="auth-left">
      <div className="brand">
        <div className="logo-box" />
        <span>FoodScout</span>
      </div>
      <div className="auth-content">
        <h1>Create account</h1>
        <p className="subtitle">Start discovering restaurants</p>
        {error && <div className="error">{error}</div>}
        <form onSubmit={handleSubmit} className="form">
          <div className="field">
            <label>Full name</label>
            <input
              type="text"
              name="name"
              required
              autoComplete="name"
              disabled={loading}
            />
          </div>
          <div className="field">
            <label>Email address</label>
            <input
              type="email"
              name="email"
              required
              autoComplete="email"
              disabled={loading}
            />
          </div>
          <div className="field">
            <label>Password</label>
            <input
              type="password"
              name="password"
              required
              minLength={6}
              autoComplete="new-password"
              disabled={loading}
            />
          </div>
          <button
            className="primary-btn"
            disabled={loading}
            type="submit"
          >
            {loading ? "Creating account..." : "Sign up"}
          </button>
        </form>
        {/* MOVE IT HERE */}
        <p className="login-link">
          Already have an account?{" "}
          <Link className="login-link-action" to="/login">Login</Link>
        </p>
      </div>
    </div>

    {/* RIGHT */}
    <div className="auth-right">
      <div className="visual-layer" />
      <div className="visual-content">
        <h2>Join the experience</h2>
        <p>
          Save your favorite spots, leave reviews, and explore food around you.
        </p>
      </div>
    </div>
  </div>
)

}