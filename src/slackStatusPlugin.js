// Generic plugin to get the react status and put it into divs on the page.
import getStatus from './getStatus'

function slackStatusPlugin() {
  const items = document.querySelectorAll('.status-sender')
  const teamId = document.querySelector('[name="status-sender-team-id"]').getAttribute('content')
  const token = document.querySelector('[name="status-sender-token"]').getAttribute('content')

  const showErrorState = (item) => {
    const errorText = 'Failed to load status'

    item.innerHTML = errorText // eslint-disable-line no-param-reassign
    item.classList.remove('status-sender--loading')
    item.classList.add('status-sender--error')
  }

  if (items) {
    [...items].forEach((item) => {
      const id = item.getAttribute('data-id')
      const placeholder = item.getAttribute('data-placeholder')

      getStatus({ userId: id, teamId, token }).then((data) => {
        if (data.status) {
          const { status: { emoji, content } } = data
          const noEmoji = emoji === '' || !emoji
          const noContent = content === '' || !content
          const noStatus = noEmoji && noContent

          let template = `
            <span class="status-sender__emoji">${data.status.emoji || '◯'}</span>
          `

          if (data.status.content !== '') {
            template += `<span class="status-sender__text">${data.status.content}</span>`
          }

          if (noStatus) {
            template += `<span className='status-sender__placeholder'>${placeholder || 'No status'}</span>`
          }

          item.innerHTML = template // eslint-disable-line no-param-reassign
          item.classList.remove('status-sender--loading')
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
