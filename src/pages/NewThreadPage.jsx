import { useNavigate } from 'react-router-dom'
import ThreadForm from '../components/ThreadForm.jsx'
import { createThread } from '../states/threads/threadsSlice.js'
import { useAppDispatch, useAppSelector } from '../states/hooks.js'

export default function NewThreadPage () {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { isMutating, error } = useAppSelector((state) => state.threads)

  async function handleSubmit (payload) {
    const thread = await dispatch(createThread(payload)).unwrap()
    navigate(`/threads/${thread.id}`)
  }

  return (
    <section>
      <h1 className="page-title">Buat Thread Baru</h1>
      {error && <p className="message error">{error}</p>}
      <ThreadForm isLoading={isMutating} onSubmit={handleSubmit} />
    </section>
  )
}
