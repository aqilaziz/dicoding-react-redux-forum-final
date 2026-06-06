import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import CategoryFilter from '../CategoryFilter.jsx'

describe('CategoryFilter component', () => {
  it('skenario: menampilkan kategori dan memberi kelas active pada kategori terpilih', () => {
    render(
      <CategoryFilter
        activeCategory="redux"
        categories={['react', 'redux']}
        onChange={() => {}}
      />
    )

    expect(screen.getByRole('button', { name: '#redux' })).toHaveClass('active')
    expect(screen.getByRole('button', { name: '#react' })).toBeInTheDocument()
  })

  it('skenario: memanggil onChange saat kategori diklik', async () => {
    const onChange = vi.fn()
    render(
      <CategoryFilter
        activeCategory="all"
        categories={['react']}
        onChange={onChange}
      />
    )

    await userEvent.click(screen.getByRole('button', { name: '#react' }))

    expect(onChange).toHaveBeenCalledWith('react')
  })
})
