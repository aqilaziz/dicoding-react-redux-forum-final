import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../utils/api.js'

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const data = await api.getAllUsers()
      return data.users
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    items: [],
    isLoading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.items = action.payload
        state.isLoading = false
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.error = action.payload
        state.isLoading = false
      })
  }
})

export default usersSlice.reducer
