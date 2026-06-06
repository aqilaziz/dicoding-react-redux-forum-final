import { configureStore } from '@reduxjs/toolkit'
import { afterEach, describe, expect, it, vi } from 'vitest'
import api from '../../../utils/api.js'
import authReducer, { fetchLoggedUser, loginUser } from '../authSlice.js'

function createStore() {
  return configureStore({
    reducer: {
      auth: authReducer,
    },
  })
}

describe('auth thunks', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('skenario: fetchLoggedUser menyimpan user ketika token tersedia dan API berhasil', async () => {
    const user = { id: 'user-1', name: 'Aqil' }
    vi.spyOn(api, 'getToken').mockReturnValue('token')
    vi.spyOn(api, 'getOwnProfile').mockResolvedValue({ user })
    const store = createStore()

    await store.dispatch(fetchLoggedUser())

    expect(store.getState().auth.user).toEqual(user)
  })

  it('skenario: fetchLoggedUser menghapus sesi ketika token tidak valid', async () => {
    vi.spyOn(api, 'getToken').mockReturnValue('token')
    vi.spyOn(api, 'getOwnProfile').mockRejectedValue(new Error('token invalid'))
    const removeToken = vi.spyOn(api, 'removeToken').mockImplementation(() => {})
    const store = createStore()

    await store.dispatch(fetchLoggedUser())

    expect(removeToken).toHaveBeenCalled()
    expect(store.getState().auth.user).toBeNull()
  })

  it('skenario: loginUser memanggil login lalu mengambil profil user', async () => {
    const user = { id: 'user-1', name: 'Aqil' }
    vi.spyOn(api, 'login').mockResolvedValue('token')
    vi.spyOn(api, 'getToken').mockReturnValue('token')
    vi.spyOn(api, 'getOwnProfile').mockResolvedValue({ user })
    const store = createStore()

    await store.dispatch(loginUser({ email: 'a@mail.com', password: 'secret' }))

    expect(api.login).toHaveBeenCalledWith({ email: 'a@mail.com', password: 'secret' })
    expect(store.getState().auth.user).toEqual(user)
  })
})
