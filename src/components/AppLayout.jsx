import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../states/hooks.js'
import { logout } from '../states/auth/authSlice.js'

export default function AppLayout () {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state) => state.auth)

  function onLogout () {
    dispatch(logout())
    navigate('/')
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="topbar__inner">
          <Link className="brand" to="/">Rembuk Forum</Link>
          <nav className="nav">
            <NavLink to="/">Threads</NavLink>
            <NavLink to="/leaderboards">Leaderboard</NavLink>
            {user
              ? (
              <>
                <NavLink to="/threads/new">Buat Thread</NavLink>
                <span>{user.name}</span>
                <button type="button" onClick={onLogout}>Keluar</button>
              </>
                )
              : (
              <>
                <NavLink to="/login">Masuk</NavLink>
                <NavLink to="/register">Daftar</NavLink>
              </>
                )}
          </nav>
        </div>
      </header>
      <main className="page">
        <Outlet />
      </main>
    </div>
  )
}
