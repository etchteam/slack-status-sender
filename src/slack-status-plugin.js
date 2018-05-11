// Generic plugin to get the react status and put it into divs on the page.
import getStatus from './getStatus';

function slackStatusInit() {
  const items = document.querySelectorAll('.slack-status');

  const showErrorState = (item) => {
    const errorText = 'Failed to load status';

    item.innerHTML = errorText; // eslint-disable-line no-param-reassign
    item.classList.remove('slack-status--loading');
    item.classList.add('slack-status--error');
  };

  if (items) {
    items.forEach((item) => {
      const id = item.getAttribute('data-id');

      getStatus({ id }).then((data) => {
        if (data.user) {
          const template = `
            <div className="slack-status__emoji" style="display: inline-block;">${data.user.statusEmoji}</div>
            <p className="slack-status__text" style="display: inline-block;">${data.user.statusText}</p>
          `;

          item.innerHTML = template; // eslint-disable-line no-param-reassign
          item.classList.remove('slack-status--loading');
        } else {
          showErrorState(item);
        }
      }).catch(() => {
        showErrorState(item);
      });
    });
  }
}

slackStatusInit();
