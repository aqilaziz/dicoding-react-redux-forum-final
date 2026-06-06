import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth/authSlice.js'
import leaderboardsReducer from './leaderboards/leaderboardsSlice.js'
import threadDetailReducer from './threadDetail/threadDetailSlice.js'
import threadsReducer from './threads/threadsSlice.js'
import usersReducer from './users/usersSlice.js'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    threads: threadsReducer,
    threadDetail: threadDetailReducer,
    leaderboards: leaderboardsReducer
  }
})
