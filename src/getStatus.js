/* globals fetch */
// Get the users current status from the API.
// Returns a promise, then the data.

function query({ userId, teamId }) {
  return `
    query {
      status(userId: "${userId}", teamId: "${teamId}") {
        content
        emoji
        emojiText
      }
    }
  `
}

export default function getStatus({ userId, teamId, token }) {
  return fetch('https://sender.etch.co/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ query: query({ userId, teamId }) })
  })
    .then((res) => res.json())
    .then((res) => res.data)
}
