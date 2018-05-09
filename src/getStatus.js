// Get the users current status from the API.
function query({ id }) {
  return `
    query {
      user(slackId: "${id}") {
        statusText
        statusEmoji
      }
    }
  `;
}

export default function getStatus({ id }) {
  return fetch('https://example.org', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: query({ id }) }),
  })
    .then(res => res.json())
    .then(res => res.data);
}
