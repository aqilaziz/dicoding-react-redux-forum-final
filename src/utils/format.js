export function postedAt (date) {
  return new Intl.DateTimeFormat('id-ID', {
    dateStyle: 'medium',
    timeStyle: 'short'
  }).format(new Date(date))
}

export function stripHtml (html = '') {
  const temporary = document.createElement('div')
  temporary.innerHTML = html
  return temporary.textContent || temporary.innerText || ''
}

export function getVoteStatus (item, authUserId) {
  if (!authUserId) {
    return null
  }

  if (item.upVotesBy?.includes(authUserId)) {
    return 'up-vote'
  }

  if (item.downVotesBy?.includes(authUserId)) {
    return 'down-vote'
  }

  return null
}
