import { Navigate, useLocation } from 'react-router-dom'
import { useAppSelector } from '../states/hooks.js'

export default function ProtectedRoute ({ children }) {
  const location = useLocation()
  const { user, isInitializing } = useAppSelector((state) => state.auth)

  if (isInitializing) {
    return <p className="loading">Memeriksa sesi...</p>
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />
  }

  return children
}
