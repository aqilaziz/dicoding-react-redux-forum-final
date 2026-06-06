import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../utils/api.js'

export const fetchLeaderboards = createAsyncThunk(
  'leaderboards/fetchLeaderboards',
  async (_, { rejectWithValue }) => {
    try {
      const data = await api.getLeaderboards()
      return data.leaderboards
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const leaderboardsSlice = createSlice({
  name: 'leaderboards',
  initialState: {
    items: [],
    isLoading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeaderboards.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchLeaderboards.fulfilled, (state, action) => {
        state.items = action.payload
        state.isLoading = false
      })
      .addCase(fetchLeaderboards.rejected, (state, action) => {
        state.error = action.payload
        state.isLoading = false
      })
  }
})

export default leaderboardsSlice.reducer
