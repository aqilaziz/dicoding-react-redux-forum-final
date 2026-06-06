import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import AuthorMeta from '../components/AuthorMeta.jsx'
import CommentForm from '../components/CommentForm.jsx'
import CommentItem from '../components/CommentItem.jsx'
import HtmlContent from '../components/HtmlContent.jsx'
import VoteButtons from '../components/VoteButtons.jsx'
import { useAppDispatch, useAppSelector } from '../states/hooks.js'
import {
  clearThreadDetail,
  createComment,
  fetchThreadDetail,
  optimisticVoteComment,
  optimisticVoteDetailThread,
  voteComment,
  voteDetailThread
} from '../states/threadDetail/threadDetailSlice.js'

export default function ThreadDetailPage () {
  const { threadId } = useParams()
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state) => state.auth)
  const { item: thread, isLoading, isMutating, error } = useAppSelector((state) => state.threadDetail)

  useEffect(() => {
    dispatch(fetchThreadDetail(threadId))

    return () => {
      dispatch(clearThreadDetail())
    }
  }, [dispatch, threadId])

  function handleSubmitComment (content) {
    dispatch(createComment({ threadId, content }))
  }

  function handleThreadVote (voteType) {
    if (!user) {
      return
    }

    dispatch(optimisticVoteDetailThread({ userId: user.id, voteType }))
    dispatch(voteDetailThread({ threadId, voteType }))
  }

  function handleCommentVote (commentId, voteType) {
    if (!user) {
      return
    }

    dispatch(optimisticVoteComment({
      commentId,
      userId: user.id,
      voteType
    }))
    dispatch(voteComment({
      threadId,
      commentId,
      voteType
    }))
  }

  if (isLoading || !thread) {
    return <p className="loading">Memuat detail thread...</p>
  }

  return (
    <article className="thread-detail">
      {error && <p className="message error">{error}</p>}
      <div className="thread-card">
        <span className="tag">#{thread.category || 'umum'}</span>
        <h1>{thread.title}</h1>
        <AuthorMeta user={thread.owner} createdAt={thread.createdAt} />
        <HtmlContent html={thread.body} />
        <VoteButtons item={thread} userId={user?.id} onVote={handleThreadVote} />
      </div>

      <section className="comments">
        <h2>{thread.comments.length} Komentar</h2>
        {user
          ? (
          <CommentForm isLoading={isMutating} onSubmit={handleSubmitComment} />
            )
          : (
          <p className="message">
            <Link to="/login">Masuk</Link> untuk menulis komentar.
          </p>
            )}
        {thread.comments.map((comment) => (
          <CommentItem
            authUserId={user?.id}
            comment={comment}
            key={comment.id}
            onVote={handleCommentVote}
          />
        ))}
      </section>
    </article>
  )
}
