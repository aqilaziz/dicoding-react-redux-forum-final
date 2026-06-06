import { describe, expect, it } from 'vitest'
import threadDetailReducer, {
  clearThreadDetail,
  createComment,
  optimisticVoteComment,
  optimisticVoteDetailThread,
} from '../threadDetailSlice.js'

describe('threadDetail reducer', () => {
  const detailThread = {
    id: 'thread-1',
    upVotesBy: [],
    downVotesBy: ['user-1'],
    comments: [{
      id: 'comment-1',
      upVotesBy: [],
      downVotesBy: [],
    }],
  }

  const stateWithDetail = {
    item: detailThread,
    isLoading: false,
    isMutating: false,
    error: null,
  }

  it('skenario: menghapus detail thread ketika halaman detail ditinggalkan', () => {
    const state = threadDetailReducer(stateWithDetail, clearThreadDetail())

    expect(state.item).toBeNull()
    expect(state.error).toBeNull()
  })

  it('skenario: menerapkan optimistic vote pada detail thread', () => {
    const state = threadDetailReducer(stateWithDetail, optimisticVoteDetailThread({
      userId: 'user-1',
      voteType: 'up-vote',
    }))

    expect(state.item.upVotesBy).toContain('user-1')
    expect(state.item.downVotesBy).not.toContain('user-1')
  })

  it('skenario: menerapkan optimistic vote pada komentar', () => {
    const state = threadDetailReducer(stateWithDetail, optimisticVoteComment({
      commentId: 'comment-1',
      userId: 'user-1',
      voteType: 'down-vote',
    }))

    expect(state.item.comments[0].downVotesBy).toContain('user-1')
  })

  it('skenario: menambahkan komentar baru ketika createComment berhasil', () => {
    const comment = { id: 'comment-2', content: 'Halo' }
    const state = threadDetailReducer(stateWithDetail, createComment.fulfilled(comment))

    expect(state.item.comments).toHaveLength(2)
    expect(state.item.comments[1]).toEqual(comment)
  })
})
