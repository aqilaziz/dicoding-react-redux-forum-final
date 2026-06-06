import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { loginUser } from '../states/auth/authSlice.js'
import { useAppDispatch, useAppSelector } from '../states/hooks.js'

export default function LoginPage () {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useAppDispatch()
  const { isLoading, error } = useAppSelector((state) => state.auth)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleSubmit (event) {
    event.preventDefault()
    await dispatch(loginUser({ email, password })).unwrap()
    navigate(location.state?.from || '/')
  }

  return (
    <section className="form-card">
      <h1 className="page-title">Masuk</h1>
      {error && <p className="message error">{error}</p>}
      <form className="form-stack" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            required
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            required
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button className="button" disabled={isLoading} type="submit">
          {isLoading ? 'Masuk...' : 'Masuk'}
        </button>
        <p className="muted">Belum punya akun? <Link to="/register">Daftar sekarang</Link>.</p>
      </form>
    </section>
  )
}
