import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../utils/api.js'

export const fetchThreadDetail = createAsyncThunk(
  'threadDetail/fetchThreadDetail',
  async (threadId, { rejectWithValue }) => {
    try {
      const data = await api.getThreadDetail(threadId)
      return data.detailThread
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const createComment = createAsyncThunk(
  'threadDetail/createComment',
  async (payload, { rejectWithValue }) => {
    try {
      const data = await api.createComment(payload)
      return data.comment
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const voteDetailThread = createAsyncThunk(
  'threadDetail/voteDetailThread',
  async (payload, { rejectWithValue }) => {
    try {
      await api.voteThread(payload)
      return payload
    } catch (error) {
      return rejectWithValue({ ...payload, message: error.message })
    }
  }
)

export const voteComment = createAsyncThunk(
  'threadDetail/voteComment',
  async (payload, { rejectWithValue }) => {
    try {
      await api.voteComment(payload)
      return payload
    } catch (error) {
      return rejectWithValue({ ...payload, message: error.message })
    }
  }
)

function applyVote (target, userId, voteType) {
  target.upVotesBy = target.upVotesBy.filter((id) => id !== userId)
  target.downVotesBy = target.downVotesBy.filter((id) => id !== userId)

  if (voteType === 'up-vote') {
    target.upVotesBy.push(userId)
  }

  if (voteType === 'down-vote') {
    target.downVotesBy.push(userId)
  }
}

const threadDetailSlice = createSlice({
  name: 'threadDetail',
  initialState: {
    item: null,
    isLoading: false,
    isMutating: false,
    error: null
  },
  reducers: {
    clearThreadDetail (state) {
      state.item = null
      state.error = null
    },
    optimisticVoteDetailThread (state, action) {
      const { userId, voteType } = action.payload

      if (state.item) {
        applyVote(state.item, userId, voteType)
      }
    },
    optimisticVoteComment (state, action) {
      const { commentId, userId, voteType } = action.payload
      const comment = state.item?.comments.find((item) => item.id === commentId)

      if (comment) {
        applyVote(comment, userId, voteType)
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchThreadDetail.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchThreadDetail.fulfilled, (state, action) => {
        state.item = action.payload
        state.isLoading = false
      })
      .addCase(fetchThreadDetail.rejected, (state, action) => {
        state.error = action.payload
        state.isLoading = false
      })
      .addCase(createComment.pending, (state) => {
        state.isMutating = true
        state.error = null
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.item.comments.push(action.payload)
        state.isMutating = false
      })
      .addCase(createComment.rejected, (state, action) => {
        state.error = action.payload
        state.isMutating = false
      })
  }
})

export const {
  clearThreadDetail,
  optimisticVoteComment,
  optimisticVoteDetailThread
} = threadDetailSlice.actions
export default threadDetailSlice.reducer
