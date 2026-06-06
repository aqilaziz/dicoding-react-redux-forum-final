import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../utils/api.js'

export const fetchLoggedUser = createAsyncThunk(
  'auth/fetchLoggedUser',
  async (_, { rejectWithValue }) => {
    if (!api.getToken()) {
      return null
    }

    try {
      const data = await api.getOwnProfile()
      return data.user
    } catch (error) {
      api.removeToken()
      return rejectWithValue(error.message)
    }
  },
)

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credential, { dispatch, rejectWithValue }) => {
    try {
      await api.login(credential)
      const result = await dispatch(fetchLoggedUser()).unwrap()
      return result
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (payload, { rejectWithValue }) => {
    try {
      const data = await api.register(payload)
      return data.user
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isInitializing: true,
    isLoading: false,
    error: null,
  },
  reducers: {
    logout(state) {
      api.removeToken()
      state.user = null
    },
    clearAuthError(state) {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoggedUser.pending, (state) => {
        state.isInitializing = true
      })
      .addCase(fetchLoggedUser.fulfilled, (state, action) => {
        state.user = action.payload
        state.isInitializing = false
      })
      .addCase(fetchLoggedUser.rejected, (state, action) => {
        state.user = null
        state.error = action.payload
        state.isInitializing = false
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload
        state.isLoading = false
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload
        state.isLoading = false
      })
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload
        state.isLoading = false
      })
  },
})

export const { clearAuthError, logout } = authSlice.actions
export default authSlice.reducer
