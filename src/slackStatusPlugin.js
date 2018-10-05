// Generic plugin to get the react status and put it into divs on the page.
import getStatus from './getStatus'

function slackStatusInit() {
  const items = document.querySelectorAll('.slack-status')
  const teamId = document.querySelector('[name="statusify-team-id"]').getAttribute('content')
  const token = document.querySelector('[name="statusify-token"]').getAttribute('content')

  const showErrorState = (item) => {
    const errorText = 'Failed to load status'

    item.innerHTML = errorText // eslint-disable-line no-param-reassign
    item.classList.remove('slack-status--loading')
    item.classList.add('slack-status--error')
  }

  if (items) {
    items.forEach((item) => {
      const id = item.getAttribute('data-id')

      getStatus({ userId: id, teamId, token }).then((data) => {
        if (data.user) {
          let template = `
            <div className="slack-status__emoji">${data.user.statusEmoji}</div>
          `

          if (data.user.statusText !== '') {
            template += `<p className="slack-status__text">${data.user.statusText}</p>`
          }

          item.innerHTML = template // eslint-disable-line no-param-reassign
          item.classList.remove('slack-status--loading')
        } else {
          showErrorState(item)
        }
      }).catch(() => {
        showErrorState(item)
      })
    })
  }
}

slackStatusInit()
