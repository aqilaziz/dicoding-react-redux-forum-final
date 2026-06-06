const API_BASE_URL = 'https://forum-api.dicoding.dev/v1'
const TOKEN_KEY = 'dicoding_forum_token'

function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

function putToken(token) {
  localStorage.setItem(TOKEN_KEY, token)
}

function removeToken() {
  localStorage.removeItem(TOKEN_KEY)
}

async function request(path, options = {}) {
  const token = getToken()
  const headers = {
    ...options.headers,
  }

  if (options.body) {
    headers['Content-Type'] = 'application/json'
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  })
  const payload = await response.json()

  if (!response.ok || payload.status === 'fail') {
    throw new Error(payload.message || 'Permintaan gagal diproses.')
  }

  return payload.data
}

const api = {
  async register({ name, email, password }) {
    return request('/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    })
  },

  async login({ email, password }) {
    const data = await request('/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
    putToken(data.token)
    return data.token
  },

  async getOwnProfile() {
    return request('/users/me')
  },

  async getAllUsers() {
    return request('/users')
  },

  async getAllThreads() {
    return request('/threads')
  },

  async getThreadDetail(threadId) {
    return request(`/threads/${threadId}`)
  },

  async createThread({ title, body, category }) {
    return request('/threads', {
      method: 'POST',
      body: JSON.stringify({ title, body, category }),
    })
  },

  async createComment({ threadId, content }) {
    return request(`/threads/${threadId}/comments`, {
      method: 'POST',
      body: JSON.stringify({ content }),
    })
  },

  async voteThread({ threadId, voteType }) {
    return request(`/threads/${threadId}/${voteType}`, {
      method: 'POST',
    })
  },

  async voteComment({ threadId, commentId, voteType }) {
    return request(`/threads/${threadId}/comments/${commentId}/${voteType}`, {
      method: 'POST',
    })
  },

  async getLeaderboards() {
    return request('/leaderboards')
  },

  getToken,
  removeToken,
}

export default api
