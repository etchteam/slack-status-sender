import React, { Component } from 'react'

import { StatusSender } from 'slack-status-sender'

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJVMk5LMTlKMEwiLCJ0ZWFtSWQiOiJUMk5LRjM0RjMiLCJyb2xlIjoidmlld2VyIiwiaWF0IjoxNTM4NzI5NDcwfQ.xJNGL_mRtr1iqLHlYIWBq3U3v_tvOgMkMIrxbe7p8hw'

export default class App extends Component {
  render () {
    return (
      <div>
        <h1>Slack Status Sender</h1>
        <StatusSender
          token={token}
          userId='U2NK19J0L'
          teamId='T2NKF34F3'
        />
      </div>
    )
  }
}
