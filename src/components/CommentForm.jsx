import { useState } from 'react'

export default function CommentForm({ isLoading, onSubmit }) {
  const [content, setContent] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    onSubmit(content)
    setContent('')
  }

  return (
    <form className="form-card form-stack" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="content">Tulis komentar</label>
        <textarea
          id="content"
          required
          value={content}
          onChange={(event) => setContent(event.target.value)}
        />
      </div>
      <button className="button" disabled={isLoading} type="submit">
        {isLoading ? 'Mengirim...' : 'Kirim Komentar'}
      </button>
    </form>
  )
}
