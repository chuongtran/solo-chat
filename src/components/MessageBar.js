import React, { Component } from "react";
import styled from 'styled-components';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';

import { selectApplicationStopped } from '../selectors';
import { addMessage } from '../actions';

import SuggestedCommands from './SuggestedCommands';

const StyledWrapper = styled.form`
  display: flex;
  position: relative;
`;
const StyledInput = styled.input`
  height: 34px;
  padding: 0 12px;
  flex: 1;
  margin-right: 15px;
`;

const StyledButton = styled.button`
  height: 34px;
  padding: 0 12px;  
`;

class MessageBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      commandOpened: false
    }
  };

  onMessageChange = (evt) => {
    const message = evt.target.value;
    const commandOpened = message[0] === '/';
    this.setState({ message, commandOpened });
  };
  onSubmit = (evt) => {
    evt.preventDefault();
    const { onSubmit } = this.props;
    var result = onSubmit(this.state.message);
    if (result) {
      this.setState({ message: '', commandOpened: false });
    }
  }

  onCommandSelect = (command) => {
    this.setState({ message: `/${command}`, commandOpened: false });
    this.messageInput.focus();
  }

  messageInput = null;

  render() {
    const { message, commandOpened } = this.state;
    const { applicationStopped } = this.props;

    return (
      <StyledWrapper className="messageBar" onSubmit={this.onSubmit}>
        <StyledInput disabled={applicationStopped} value={message} onChange={this.onMessageChange} ref={ (el) => { this.messageInput = el; }} />
        { !applicationStopped ? <StyledButton type="submit" onClick={this.onSubmit}>SEND</StyledButton> : null }
        <SuggestedCommands open={commandOpened} onCommandSelect={this.onCommandSelect} />
      </StyledWrapper>
    );
  }
}

MessageBar.propTypes = {
  onSubmit: PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    addMessage(message) {
      dispatch(addMessage(message));
    }
  };
}
const mapStateToProps = createStructuredSelector({
  applicationStopped: selectApplicationStopped()
});

export default connect(mapStateToProps, mapDispatchToProps)(MessageBar);

