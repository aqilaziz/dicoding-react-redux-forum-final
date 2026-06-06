import { configureStore } from '@reduxjs/toolkit'
import { afterEach, describe, expect, it, vi } from 'vitest'
import api from '../../../utils/api.js'
import usersReducer, { fetchUsers } from '../usersSlice.js'

describe('users thunk', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('skenario: fetchUsers menyimpan daftar user dari API ke Redux store', async () => {
    const users = [{ id: 'user-1', name: 'Dimas' }]
    vi.spyOn(api, 'getAllUsers').mockResolvedValue({ users })
    const store = configureStore({
      reducer: {
        users: usersReducer,
      },
    })

    await store.dispatch(fetchUsers())

    expect(store.getState().users.items).toEqual(users)
  })
})
