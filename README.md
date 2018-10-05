# slack-status-sender

> Your Slack status, sent to your site.

[![NPM](https://img.shields.io/npm/v/slack-status-sender.svg)](https://www.npmjs.com/package/slack-status-sender) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save slack-status-sender
```

## Usage

### Javascript function

Just get the raw data object using the getStatus function.

```js
import { getStatus } from 'slack-status-sender';

const status = getStatus({ userId: 'SlackID', teamId: 'TeamID', token: 'APIToken' });

// status = a promise which will return { data: { status: { emoji, emojiText, content } } }
```

### React

```jsx
import React, { Component } from 'react'

import { SlackStatus } from 'slack-status-sender'

class Example extends Component {
  render () {
    return (
      <SlackStatus
        teamId="YourTeamId"
        userId="YourUserId"
        token="YourAPIToken"
      />
    )
  }
}
```

## Javascript plugin

Add these meta tags to your HTML

```html
<meta name="statusify-team-id" content="TeamID" />
<meta name="statusify-token" content="APIToken" />
```

Add the Javascript plugin

```html
<script>
!function(){"use strict";function e(){var t=document.querySelectorAll(".slack-status-sender"),u=document.querySelector('[name="statusify-team-id"]').getAttribute("content"),c=document.querySelector('[name="statusify-token"]').getAttribute("content"),i=function(t){t.innerHTML="Failed to load status",t.classList.remove("slack-status-sender--loading"),t.classList.add("slack-status-sender--error")};t&&[].concat(function(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return Array.from(t)}(t)).forEach(function(n){var t,e,s,a,r,o=n.getAttribute("data-id");(t={userId:o,teamId:u,token:c},s=t.userId,a=t.teamId,r=t.token,fetch("https://sender.etch.co/graphql",{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer "+r},body:JSON.stringify({query:(e={userId:s,teamId:a},'\n    query {\n      status(userId: "'+e.userId+'", teamId: "'+e.teamId+'") {\n        content\n        emoji\n        emojiText\n      }\n    }\n  ')})}).then(function(t){return t.json()}).then(function(t){return t.data})).then(function(t){if(t.status){var e='\n            <div className="slack-status-sender__emoji">'+t.status.emoji+"</div>\n          ";""!==t.status.content&&(e+='<p className="slack-status-sender__text">'+t.status.content+"</p>"),n.innerHTML=e,n.classList.remove("slack-status-sender--loading")}else i(n)}).catch(function(){i(n)})})}document.addEventListener("DOMContentLoaded",function(t){e()})}();
</script>
```

Then add this HTML where you would like to display slack statuses

```html
<div class="slack-status-sender slack-status-sender--loading" data-id="SlackID">
  Loading...
</div>
```

## Support

Official supports last two versions of Chrome, Firefox, Safari and Edge.
Should work in Internet Explorer 11 if you polyfill fetch and promises.

## License

MIT © [etchteam](https://github.com/etchteam)
