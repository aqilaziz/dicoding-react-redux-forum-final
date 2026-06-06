import { describe, expect, it } from 'vitest'
import threadsReducer, {
  fetchThreads,
  optimisticVoteThread,
  setActiveCategory
} from '../threadsSlice.js'

describe('threads reducer', () => {
  const initialState = {
    items: [],
    activeCategory: 'all',
    isLoading: false,
    isMutating: false,
    error: null
  }

  it('skenario: mengubah kategori aktif saat pengguna memilih filter kategori', () => {
    const state = threadsReducer(initialState, setActiveCategory('redux'))

    expect(state.activeCategory).toBe('redux')
  })

  it('skenario: menerapkan optimistic up-vote dan membersihkan down-vote milik user yang sama', () => {
    const state = threadsReducer({
      ...initialState,
      items: [{
        id: 'thread-1',
        upVotesBy: [],
        downVotesBy: ['user-1']
      }]
    }, optimisticVoteThread({
      threadId: 'thread-1',
      userId: 'user-1',
      voteType: 'up-vote'
    }))

    expect(state.items[0].upVotesBy).toContain('user-1')
    expect(state.items[0].downVotesBy).not.toContain('user-1')
  })

  it('skenario: menyimpan daftar thread ketika fetchThreads berhasil', () => {
    const threads = [{ id: 'thread-1', title: 'Redux' }]
    const state = threadsReducer(initialState, fetchThreads.fulfilled(threads))

    expect(state.items).toEqual(threads)
    expect(state.isLoading).toBe(false)
  })
})
