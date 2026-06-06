import { useEffect } from 'react'
import { fetchLeaderboards } from '../states/leaderboards/leaderboardsSlice.js'
import { useAppDispatch, useAppSelector } from '../states/hooks.js'

export default function LeaderboardPage () {
  const dispatch = useAppDispatch()
  const { items, isLoading, error } = useAppSelector((state) => state.leaderboards)

  useEffect(() => {
    dispatch(fetchLeaderboards())
  }, [dispatch])

  return (
    <section>
      <h1 className="page-title">Leaderboard</h1>
      {isLoading && <p className="loading">Memuat leaderboard...</p>}
      {error && <p className="message error">{error}</p>}
      <div className="leaderboard-list">
        {items.map((item, index) => (
          <div className="leaderboard-row" key={item.user.id}>
            <div className="thread-meta">
              <strong>#{index + 1}</strong>
              <img className="avatar" src={item.user.avatar} alt={item.user.name} />
              <strong>{item.user.name}</strong>
            </div>
            <span className="counter">{item.score} poin</span>
          </div>
        ))}
      </div>
    </section>
  )
}
