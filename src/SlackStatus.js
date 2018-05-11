// A React Component for your slack status
import React from 'react';
import PropTypes from 'prop-types';
import getStatus from './getStatus';

export default class SlackStatus extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      loading: true,
    };
  }

  componentDidMount() {
    const { id } = this.props;
    // Have to return this for testing
    return getStatus({ id })
      .then(data => this.setState({ data, loading: false }))
      .catch(() => this.setState({ loading: false }));
  }

  render() {
    const { data, loading } = this.state;

    if (loading) {
      return (
        <div className="slack-status slack-status--loading">Loading...</div>
      );
    }

    if (!data || (data && !data.user)) {
      return (
        <div className="slack-status slack-status--error">Failed to load status</div>
      );
    }

    return (
      <div className="slack-status">
        <div className="slack-status__emoji">{data.user.statusEmoji}</div>
        {data.user.statusText !== '' &&
          <p className="slack-status__text">{data.user.statusText}</p>
        }
      </div>
    );
  }
}

SlackStatus.propTypes = {
  id: PropTypes.string.isRequired,
};
