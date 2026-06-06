import { useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import CategoryFilter from '../components/CategoryFilter.jsx'
import ThreadCard from '../components/ThreadCard.jsx'
import { useAppDispatch, useAppSelector } from '../states/hooks.js'
import { fetchThreads, optimisticVoteThread, setActiveCategory, voteThread } from '../states/threads/threadsSlice.js'
import { fetchUsers } from '../states/users/usersSlice.js'

export default function HomePage() {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state) => state.auth)
  const { items: threads, activeCategory, isLoading, error } = useAppSelector((state) => state.threads)
  const users = useAppSelector((state) => state.users.items)

  useEffect(() => {
    dispatch(fetchThreads())
    dispatch(fetchUsers())
  }, [dispatch])

  const userMap = useMemo(() => new Map(users.map((item) => [item.id, item])), [users])
  const categories = useMemo(
    () => [...new Set(threads.map((thread) => thread.category).filter(Boolean))],
    [threads],
  )
  const filteredThreads = activeCategory === 'all'
    ? threads
    : threads.filter((thread) => thread.category === activeCategory)

  function handleVote(threadId, voteType) {
    if (!user) {
      return
    }

    dispatch(optimisticVoteThread({ threadId, userId: user.id, voteType }))
    dispatch(voteThread({ threadId, voteType }))
  }

  return (
    <>
      <section className="hero">
        <div>
          <h1>Diskusi React dan Redux</h1>
          <p className="muted">
            Telusuri thread, ikuti kategori, dan ikut berdiskusi dengan pengguna lain.
          </p>
        </div>
        <Link className="button" to={user ? '/threads/new' : '/login'}>
          Buat Thread
        </Link>
      </section>

      <div className="layout-grid">
        <section className="thread-list" aria-label="Daftar thread">
          {isLoading && <p className="loading">Memuat thread...</p>}
          {error && <p className="message error">{error}</p>}
          {!isLoading && filteredThreads.map((thread) => (
            <ThreadCard
              authUserId={user?.id}
              key={thread.id}
              owner={userMap.get(thread.ownerId)}
              thread={thread}
              onVote={handleVote}
            />
          ))}
          {!isLoading && filteredThreads.length === 0 && (
            <p className="message">Belum ada thread pada kategori ini.</p>
          )}
        </section>
        <CategoryFilter
          activeCategory={activeCategory}
          categories={categories}
          onChange={(category) => dispatch(setActiveCategory(category))}
        />
      </div>
    </>
  )
}
