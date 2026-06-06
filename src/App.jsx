import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { Route, Routes } from 'react-router-dom'
import AppLayout from './components/AppLayout.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import HomePage from './pages/HomePage.jsx'
import LeaderboardPage from './pages/LeaderboardPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import NewThreadPage from './pages/NewThreadPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import ThreadDetailPage from './pages/ThreadDetailPage.jsx'
import { useAppDispatch } from './states/hooks.js'
import { fetchLoggedUser } from './states/auth/authSlice.js'

export default function App () {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchLoggedUser())
  }, [dispatch])

  return (
    <>
      <Helmet>
        <title>Rembuk Forum</title>
        <meta
          name="description"
          content="Aplikasi forum diskusi React Redux untuk berbagi thread, komentar, vote, dan leaderboard."
        />
      </Helmet>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="threads/:threadId" element={<ThreadDetailPage />} />
          <Route path="leaderboards" element={<LeaderboardPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route
            path="threads/new"
            element={(
              <ProtectedRoute>
                <NewThreadPage />
              </ProtectedRoute>
            )}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  )
}
