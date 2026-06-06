import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../utils/api.js'

export const fetchThreads = createAsyncThunk(
  'threads/fetchThreads',
  async (_, { rejectWithValue }) => {
    try {
      const data = await api.getAllThreads()
      return data.threads
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)

export const createThread = createAsyncThunk(
  'threads/createThread',
  async (payload, { rejectWithValue }) => {
    try {
      const data = await api.createThread(payload)
      return data.thread
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)

export const voteThread = createAsyncThunk(
  'threads/voteThread',
  async (payload, { rejectWithValue }) => {
    try {
      await api.voteThread(payload)
      return payload
    } catch (error) {
      return rejectWithValue({ ...payload, message: error.message })
    }
  },
)

function applyVote(thread, userId, voteType) {
  thread.upVotesBy = thread.upVotesBy.filter((id) => id !== userId)
  thread.downVotesBy = thread.downVotesBy.filter((id) => id !== userId)

  if (voteType === 'up-vote') {
    thread.upVotesBy.push(userId)
  }

  if (voteType === 'down-vote') {
    thread.downVotesBy.push(userId)
  }
}

const threadsSlice = createSlice({
  name: 'threads',
  initialState: {
    items: [],
    activeCategory: 'all',
    isLoading: false,
    isMutating: false,
    error: null,
  },
  reducers: {
    setActiveCategory(state, action) {
      state.activeCategory = action.payload
    },
    optimisticVoteThread(state, action) {
      const { threadId, userId, voteType } = action.payload
      const thread = state.items.find((item) => item.id === threadId)

      if (thread) {
        applyVote(thread, userId, voteType)
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchThreads.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchThreads.fulfilled, (state, action) => {
        state.items = action.payload
        state.isLoading = false
      })
      .addCase(fetchThreads.rejected, (state, action) => {
        state.error = action.payload
        state.isLoading = false
      })
      .addCase(createThread.pending, (state) => {
        state.isMutating = true
        state.error = null
      })
      .addCase(createThread.fulfilled, (state, action) => {
        state.items.unshift(action.payload)
        state.isMutating = false
      })
      .addCase(createThread.rejected, (state, action) => {
        state.error = action.payload
        state.isMutating = false
      })
  },
})

export const { optimisticVoteThread, setActiveCategory } = threadsSlice.actions
export default threadsSlice.reducer
