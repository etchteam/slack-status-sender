// A React Component for your slack status
import React from 'react'
import PropTypes from 'prop-types'
import getStatus from './getStatus'

export default class SlackStatus extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      data: null,
      loading: true,
      error: null
    }
  }

  componentDidMount() {
    const { userId, teamId, token } = this.props
    // Have to return this for testing
    return getStatus({ userId, teamId, token })
      .then(data => this.setState({ data, loading: false, error: null }))
      .catch(error => {
        console.log('catch')
        this.setState({ loading: false, error })
      })
  }

  render() {
    const { data, loading, error } = this.state

    if (loading) {
      return (
        <div className='slack-status slack-status--loading'>Loading...</div>
      )
    }

    if (!data || (data && !data.status)) {
      console.error(error)
      return (
        <div className='slack-status slack-status--error'>Failed to load status</div>
      )
    }

    return (
      <div className='slack-status'>
        <div className='slack-status__emoji'>{data.status.emoji}</div>
        {data.status.statusText !== '' &&
          <p className='slack-status__text'>{data.status.content}</p>
        }
      </div>
    )
  }
}

SlackStatus.propTypes = {
  userId: PropTypes.string.isRequired,
  teamId: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired
}
