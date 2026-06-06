import { Link } from 'react-router-dom'
import AuthorMeta from './AuthorMeta.jsx'
import HtmlContent from './HtmlContent.jsx'
import VoteButtons from './VoteButtons.jsx'
import { stripHtml } from '../utils/format.js'

export default function ThreadCard ({ thread, owner, authUserId, onVote }) {
  const preview = stripHtml(thread.body).slice(0, 180)

  return (
    <article className="thread-card">
      <div className="thread-meta">
        <span className="tag">#{thread.category || 'umum'}</span>
        <span className="counter">{thread.totalComments} komentar</span>
      </div>
      <h2><Link to={`/threads/${thread.id}`}>{thread.title}</Link></h2>
      {preview ? <p className="muted">{preview}{preview.length >= 180 ? '...' : ''}</p> : <HtmlContent html={thread.body} />}
      <AuthorMeta user={owner} createdAt={thread.createdAt} />
      <VoteButtons
        item={thread}
        userId={authUserId}
        onVote={(voteType) => onVote(thread.id, voteType)}
      />
    </article>
  )
}
