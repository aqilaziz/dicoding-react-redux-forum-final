import { useState } from 'react'

export default function ThreadForm({ isLoading, onSubmit }) {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [body, setBody] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    onSubmit({
      title,
      category: category || 'umum',
      body,
    })
  }

  return (
    <form className="form-card form-stack" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="title">Judul</label>
        <input
          id="title"
          required
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </div>
      <div className="field">
        <label htmlFor="category">Kategori</label>
        <input
          id="category"
          placeholder="react, redux, diskusi"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        />
      </div>
      <div className="field">
        <label htmlFor="body">Isi thread</label>
        <textarea
          id="body"
          required
          value={body}
          onChange={(event) => setBody(event.target.value)}
        />
      </div>
      <button className="button" disabled={isLoading} type="submit">
        {isLoading ? 'Mengirim...' : 'Terbitkan Thread'}
      </button>
    </form>
  )
}
