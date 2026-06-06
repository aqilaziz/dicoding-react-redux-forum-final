import AuthorMeta from './AuthorMeta.jsx'
import HtmlContent from './HtmlContent.jsx'
import VoteButtons from './VoteButtons.jsx'

export default function CommentItem({ comment, authUserId, onVote }) {
  return (
    <article className="comment">
      <AuthorMeta user={comment.owner} createdAt={comment.createdAt} />
      <HtmlContent html={comment.content} />
      <VoteButtons
        item={comment}
        userId={authUserId}
        onVote={(voteType) => onVote(comment.id, voteType)}
      />
    </article>
  )
}
