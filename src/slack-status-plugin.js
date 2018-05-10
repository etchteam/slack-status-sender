// Generic plugin to get the react status and put it into divs on the page.
import getStatus from './getStatus';

function slackStatusInit() {
  const items = document.querySelectorAll('.slack-status');

  if (items) {
    items.forEach((item) => {
      const id = item.getAttribute('data-id');

      getStatus({ id }).then((data) => {
        if (data.user) {
          const template = `
            <div className="slack-status__emoji">${data.user.statusEmoji}</div>
            <p className="slack-status__text">${data.user.statusText}</p>
          `;

          item.innerHTML = template; // eslint-disable-line no-param-reassign
          item.classList.remove('slack-status--loading');
        }
      });
    });
  }
}

slackStatusInit();
