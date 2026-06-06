import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import VoteButtons from '../VoteButtons.jsx'

describe('VoteButtons component', () => {
  const thread = {
    upVotesBy: ['user-1'],
    downVotesBy: [],
  }

  it('skenario: menampilkan jumlah vote dan status aktif milik user', () => {
    render(<VoteButtons item={thread} userId="user-1" onVote={() => {}} />)

    expect(screen.getByRole('button', { name: /▲ 1/i })).toHaveClass('active')
    expect(screen.getByRole('button', { name: /▼ 0/i })).toBeInTheDocument()
  })

  it('skenario: mengirim neutral-vote saat user menekan tombol up-vote yang sudah aktif', () => {
    const onVote = vi.fn()
    render(<VoteButtons item={thread} userId="user-1" onVote={onVote} />)

    fireEvent.click(screen.getByRole('button', { name: /▲ 1/i }))

    expect(onVote).toHaveBeenCalledWith('neutral-vote')
  })
})
