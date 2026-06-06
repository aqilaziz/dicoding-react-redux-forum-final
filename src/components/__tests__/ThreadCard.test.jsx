import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import ThreadCard from '../ThreadCard.jsx'

describe('ThreadCard component', () => {
  it('skenario: menampilkan informasi thread dan pembuat thread', () => {
    const thread = {
      id: 'thread-1',
      title: 'Belajar Redux',
      body: '<p>Redux membantu pengelolaan state.</p>',
      category: 'redux',
      createdAt: '2024-01-01T00:00:00.000Z',
      ownerId: 'user-1',
      totalComments: 2,
      upVotesBy: [],
      downVotesBy: [],
    }
    const owner = {
      id: 'user-1',
      name: 'Aqil',
      avatar: 'https://example.com/avatar.png',
    }

    render(
      <MemoryRouter>
        <ThreadCard
          authUserId={null}
          owner={owner}
          thread={thread}
          onVote={() => {}}
        />
      </MemoryRouter>,
    )

    expect(screen.getByRole('link', { name: 'Belajar Redux' })).toHaveAttribute('href', '/threads/thread-1')
    expect(screen.getByText('#redux')).toBeInTheDocument()
    expect(screen.getByText('2 komentar')).toBeInTheDocument()
    expect(screen.getByText('Aqil')).toBeInTheDocument()
  })
})
