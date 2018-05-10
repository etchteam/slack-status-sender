// A React Component for your slack status
import React from 'react';
import PropTypes from 'prop-types';
import getStatus from './getStatus';

export default class SlackStatus extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
    };
  }

  componentDidMount() {
    const { id } = this.props;
    getStatus({ id }).then(data => this.setState({ data }));
    // @TODO Catch errors
  }

  render() {
    const { data } = this.state;

    if (!data) {
      return (
        <div className="slack-status slack-status--loading">Loading...</div>
      );
    }

    return (
      <div className="slack-status" style={{ display: 'inline-block' }}>
        <div className="slack-status__emoji" style={{ display: 'inline-block' }}>{data.user.statusEmoji}</div>
        {' '}
        <p className="slack-status__text" style={{ display: 'inline-block' }}>{data.user.statusText}</p>
      </div>
    );
  }
}

SlackStatus.propTypes = {
  id: PropTypes.string.isRequired,
};
