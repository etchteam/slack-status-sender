// Generic plugin to get the react status and put it into divs on the page.
import getStatus from './getStatus'

function slackStatusPlugin() {
  const items = document.querySelectorAll('.slack-status-sender')
  const teamId = document.querySelector('[name="statusify-team-id"]').getAttribute('content')
  const token = document.querySelector('[name="statusify-token"]').getAttribute('content')

  const showErrorState = (item) => {
    const errorText = 'Failed to load status'

    item.innerHTML = errorText // eslint-disable-line no-param-reassign
    item.classList.remove('slack-status-sender--loading')
    item.classList.add('slack-status-sender--error')
  }

  if (items) {
    [...items].forEach((item) => {
      const id = item.getAttribute('data-id')

      getStatus({ userId: id, teamId, token }).then((data) => {
        if (data.status) {
          let template = `
            <div class="slack-status-sender__emoji">${data.status.emoji}</div>
          `

          if (data.status.content !== '') {
            template += `<p class="slack-status-sender__text">${data.status.content}</p>`
          }

          item.innerHTML = template // eslint-disable-line no-param-reassign
          item.classList.remove('slack-status-sender--loading')
        } else {
          showErrorState(item)
        }
      }).catch(() => {
        showErrorState(item)
      })
    })
  }
}

document.addEventListener('DOMContentLoaded', function(event) {
  slackStatusPlugin()
})
