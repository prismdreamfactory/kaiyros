import { Component } from 'react';

class DatePost extends Component {
  render() {
    const { datesrc } = this.props;
    const event = new Date(datesrc);
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour12: false,
      timeZone: 'America/Los_Angeles',
    };
    const date = new Intl.DateTimeFormat('en-US', options).format(event);

    return date;
  }
}

export default DatePost;
