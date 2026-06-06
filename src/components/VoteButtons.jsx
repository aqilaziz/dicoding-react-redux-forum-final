import { getVoteStatus } from '../utils/format.js'

export default function VoteButtons({ item, userId, onVote }) {
  const voteStatus = getVoteStatus(item, userId)

  return (
    <div className="vote-row">
      <button
        className={`vote-button ${voteStatus === 'up-vote' ? 'active' : ''}`}
        disabled={!userId}
        type="button"
        onClick={() => onVote(voteStatus === 'up-vote' ? 'neutral-vote' : 'up-vote')}
      >
        ▲ {item.upVotesBy?.length || 0}
      </button>
      <button
        className={`vote-button ${voteStatus === 'down-vote' ? 'active' : ''}`}
        disabled={!userId}
        type="button"
        onClick={() => onVote(voteStatus === 'down-vote' ? 'neutral-vote' : 'down-vote')}
      >
        ▼ {item.downVotesBy?.length || 0}
      </button>
      {!userId && <span className="muted">Masuk untuk vote.</span>}
    </div>
  )
}
