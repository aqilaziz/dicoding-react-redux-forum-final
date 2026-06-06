import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '../states/auth/authSlice.js'
import { useAppDispatch, useAppSelector } from '../states/hooks.js'

export default function RegisterPage () {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { isLoading, error } = useAppSelector((state) => state.auth)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleSubmit (event) {
    event.preventDefault()
    await dispatch(registerUser({ name, email, password })).unwrap()
    navigate('/login')
  }

  return (
    <section className="form-card">
      <h1 className="page-title">Daftar Akun</h1>
      {error && <p className="message error">{error}</p>}
      <form className="form-stack" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="name">Nama</label>
          <input
            id="name"
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
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
            minLength="6"
            required
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button className="button" disabled={isLoading} type="submit">
          {isLoading ? 'Mendaftar...' : 'Daftar'}
        </button>
        <p className="muted">Sudah punya akun? <Link to="/login">Masuk</Link>.</p>
      </form>
    </section>
  )
}
