import React, { Component } from "react";
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { selectApplicationStopped, selectMessages } from '../selectors';
import { stopApplication } from '../actions';

class ChatArea extends Component {
  render() {
    const { messages } = this.props;
    if (typeof messages === 'undefined') return null;
    const messagesDisplay = messages.map((item, itemIndex) => <p key={`message-${itemIndex}`}>{ item.content }</p>)
    return <div className="chatArea">
      { messagesDisplay }
    </div>
  }
}

ChatArea.defaultProps = {
  contents: []
};

ChatArea.propTypes = {
  contents: PropTypes.array
};

function mapDispatchToProps(dispatch) {
  return {
    stopApplication() {
      dispatch(stopApplication());
    }
  };
}

const mapStateToProps = createStructuredSelector({
  applicationStopped: selectApplicationStopped(),
  messages: selectMessages()
});
export default connect(mapStateToProps, mapDispatchToProps)(ChatArea);
