# Statusify - Plugin

[![Known Vulnerabilities](https://snyk.io/test/github/etchteam/statusify-plugin/badge.svg)](https://snyk.io/test/github/etchteam/statusify-plugin)
[![Build Status](https://travis-ci.com/etchteam/statusify-plugin.svg?token=Keq3sENfwYStLzCYujxz&branch=develop)](https://travis-ci.com/etchteam/statusify-plugin)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/70e8177aa89f43ef997f71e70e4c9727)](https://www.codacy.com?utm_source=github.com&utm_medium=referral&utm_content=etchteam/statusify-plugin&utm_campaign=Badge_Grade)
[![Codacy Badge](https://api.codacy.com/project/badge/Coverage/70e8177aa89f43ef997f71e70e4c9727)](https://www.codacy.com?utm_source=github.com&utm_medium=referral&utm_content=etchteam/statusify-plugin&utm_campaign=Badge_Coverage)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

React plugin for 'Statusify', a service to display your Slack status on your website

# Commands

* `npm run start` - Run the demo via webpack dev server
* `npm run clean` - Remove `lib/` directory
* `npm test` - Run tests with linting.
* `npm test:watch` - You can even re-run tests on file changes!
* `npm test:prod` - Run tests with minified code.
* `npm run test:examples` - Test written examples on pure JS for better understanding module usage.
* `npm run lint` - Run ESlint with airbnb-config
* `npm run cover` - Get coverage report for your code.
* `npm run build` - Babel will transpile ES6 => ES5 and minify the code.
* `npm run prepublish` - Hook for npm. Do all the checks before publishing your module.

Forked from [flexdinesh/npm-module-boilerplate](https://github.com/flexdinesh/npm-module-boilerplate)

# Installation

## Javascript function

Just get the raw data object using the getStatus function.

```
import getStatus from 'statusify/lib/getStatus';

const status = getStatus({ id: 'SlackID' });

// status = a promise which will return { user: { statusEmoji, statusText } }
```

## React Component

A ready to use React Component

```
import SlackStatus from 'statusify/lib/SlackStatus';

<SlackStatus id="SlackID" />
```

## Javascript plugin

Copy and paste this code into your site somewhere

```
'use strict';var _getStatus=require('./getStatus'),_getStatus2=_interopRequireDefault(_getStatus);function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}function slackStatusInit(){var a=document.querySelectorAll('.slack-status');a&&a.forEach(function(a){var b=a.getAttribute('data-id');(0,_getStatus2.default)({id:b}).then(function(b){if(b.user){var c='\n            <div className="slack-status__emoji">'+b.user.statusEmoji+'</div>\n            <p className="slack-status__text">'+b.user.statusText+'</p>\n          ';a.innerHTML=c,a.classList.remove('slack-status--loading')}})})}slackStatusInit();
```

Then add this HTML where you would like to display slack statuses

```
<div class="slack-status slack-status--loading" data-id="SlackID">
  Loading...
</div>
```

# Support

Official supports last two versions of Chrome, Firefox, Safari and Edge.
Should work in Internet Explorer 11 if you polyfill fetch and promises.
