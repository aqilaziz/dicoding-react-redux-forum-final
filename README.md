# Rembuk Forum

Aplikasi forum diskusi React Redux untuk submission Dicoding kelas Menjadi React Web Developer Expert.

## Fitur

- Register dan login pengguna.
- Menampilkan daftar thread dan detail thread.
- Membuat thread dan komentar.
- Vote pada thread dan komentar.
- Leaderboard.
- Filter daftar thread berdasarkan kategori.
- Loading indicator saat mengambil data API.
- React ecosystem tambahan: `react-helmet-async`.

## Pengujian

```bash
npm run lint
npm test
npm run e2e
npm run build
```

## CI/CD

Continuous Integration menggunakan GitHub Actions di `.github/workflows/ci.yml`.
Continuous Deployment menggunakan Vercel.
