// A React Component for your slack status
import React from 'react'
import PropTypes from 'prop-types'
import getStatus from './getStatus'

export default class StatusSender extends React.Component {
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
        this.setState({ loading: false, error })
      })
  }

  render() {
    const { data, loading, error } = this.state
    const { placeholder } = this.props

    if (loading) {
      return (
        <div className='status-sender status-sender--loading'>Loading...</div>
      )
    }

    if (!data || (data && !data.status)) {
      return (
        <div className='status-sender status-sender--error'>Failed to load status</div>
      )
    }

    if (error) {
      // todo: Add error handling
    }

    const { data: { status: { emoji, content } } } = this.state
    const noEmoji = emoji === '' || !emoji
    const noContent = content === '' || !content
    const noStatus = noEmoji && noContent

    return (
      <div className={`status-sender${noStatus && ' status-senter--no-status'}`}>
        <span className='status-sender__emoji'>{data.status.emoji || '◯'}</span>
        {data.status.content && <span className='status-sender__text'>{data.status.content}</span>}
        {noStatus && <span className='status-sender__placeholder'>{placeholder}</span>}
      </div>
    )
  }
}

StatusSender.propTypes = {
  userId: PropTypes.string.isRequired,
  teamId: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  placeholder: PropTypes.node
}

StatusSender.defaultProps = {
  placeholder: 'No Status'
}
