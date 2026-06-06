import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <section className="form-card">
      <h1 className="page-title">Halaman tidak ditemukan</h1>
      <p className="muted">Alamat yang dibuka tidak tersedia.</p>
      <Link className="button" to="/">Kembali ke thread</Link>
    </section>
  )
}
