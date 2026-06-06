import { postedAt } from '../utils/format.js'

export default function AuthorMeta({ user, createdAt }) {
  return (
    <div className="thread-meta">
      {user?.avatar && <img className="avatar" src={user.avatar} alt={user.name} />}
      <strong>{user?.name || 'Pengguna forum'}</strong>
      <span className="muted">{postedAt(createdAt)}</span>
    </div>
  )
}
