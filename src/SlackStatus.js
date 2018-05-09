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
      <div className="slack-status">
        <div className="slack-status__emoji">{data.user.statusEmoji}</div>
        <p className="slack-status__text">{data.user.statusText}</p>
      </div>
    );
  }
}

SlackStatus.propTypes = {
  id: PropTypes.string.isRequired,
};
