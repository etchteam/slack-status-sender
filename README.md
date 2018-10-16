# slack-status-sender

> Your Slack status, sent to your site.

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/d27c3c392c314fbcb8cb6ea9ce052fa0)](https://www.codacy.com?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=etchteam/slack-status-sender&amp;utm_campaign=Badge_Grade)
[![Known Vulnerabilities](https://snyk.io/test/github/etchteam/slack-status-sender/badge.svg)](https://snyk.io/test/github/etchteam/slack-status-sender)
[![Build Status](https://travis-ci.com/etchteam/slack-status-sender.svg?token=Keq3sENfwYStLzCYujxz&branch=master)](https://travis-ci.com/etchteam/slack-status-sender)
[![NPM](https://img.shields.io/npm/v/slack-status-sender.svg)](https://www.npmjs.com/package/slack-status-sender)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save slack-status-sender
```

or

```bash
yarn add slack-status-sender
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
!function(){"use strict";function e(){var t=document.querySelectorAll(".status-sender"),d=document.querySelector('[name="status-sender-team-id"]').getAttribute("content"),c=document.querySelector('[name="status-sender-token"]').getAttribute("content"),i=function(t){t.innerHTML="Failed to load status",t.classList.remove("status-sender--loading"),t.classList.add("status-sender--error")};t&&[].concat(function(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return Array.from(t)}(t)).forEach(function(o){var t,e,n,s,a,r=o.getAttribute("data-id"),u=o.getAttribute("data-placeholder");(t={userId:r,teamId:d,token:c},n=t.userId,s=t.teamId,a=t.token,fetch("https://sender.etch.co/graphql",{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer "+a},body:JSON.stringify({query:(e={userId:n,teamId:s},'\n    query {\n      status(userId: "'+e.userId+'", teamId: "'+e.teamId+'") {\n        content\n        emoji\n        emojiText\n      }\n    }\n  ')})}).then(function(t){return t.json()}).then(function(t){return t.data})).then(function(t){if(t.status){var e=t.status,n=e.emoji,s=e.content,a=(""===n||!n)&&(""===s||!s),r='\n            <span class="status-sender__emoji">'+(t.status.emoji||"◯")+"</span>\n          ";""!==t.status.content&&(r+='<span class="status-sender__text">'+t.status.content+"</span>"),a&&(r+="<span className='status-sender__placeholder'>"+(u||"No status")+"</span>"),o.innerHTML=r,o.classList.remove("status-sender--loading")}else i(o)}).catch(function(){i(o)})})}document.addEventListener("DOMContentLoaded",function(t){e()})}();
</script>
```

Then add this HTML where you would like to display slack statuses

```html
<div class="slack-status-sender slack-status-sender--loading" data-id="SlackID">
  Loading...
</div>
```

## Support

Officially supports last two versions of Chrome, Firefox, Safari and Edge.
Should work in Internet Explorer 11 if you polyfill fetch and promises.

## License

MIT © [etchteam](https://github.com/etchteam)
