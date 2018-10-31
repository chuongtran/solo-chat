import React, { Component } from "react";
import { connect } from 'react-redux';
import axios from 'axios';

import { commands } from './constants';
import MessageBar from "./components/MessageBar";
import ChatArea from "./components/ChatArea";
import ErrorMessage from "./components/ErrorMessage";
import "./App.css";
import { IDGenerator } from './utils';
import { addMessage, updateMessage, stopApplication } from './actions';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: ''
    }
  }
  searchForCharacter = (messageId, query) => {
    axios.get(`https://swapi.co/api/people/?search=${query}`).then(data => {
      if(data) {
        const { results } = data.data;
        if (Array.isArray(results) && results.length) {
          this.props.updateMessage(messageId, `Search results for \`${query}\`: ${results[0].name}`);
        }
        else {
          this.props.updateMessage(messageId, `No results for \`${query}\``);
        }
      }
    }, err => {
      this.props.updateMessage(messageId, `There is an error when searching \`${query}\``);
    });
  }
  messageConverter = (message) => {
    let messageResults = null;
    const messageArray = message.split(' ');
    const messageCommand = messageArray.shift();
    const id = IDGenerator();

    const firstChar = messageCommand[0];
    if (firstChar === '/') {
      message = messageCommand.substring(1);
      if (commands.indexOf(message) > -1) {
        switch(message) {
          case 'time':
            messageResults = `Current time: ${new Date().toString()}`;
            break;
          case 'starwars':
            const query = messageArray.join(' ');
            if (!query.replace(/ /g,'')) {
              messageResults = null;
              this.setState({ errorMessage: 'Please enter a query' });
              break;
            }
            this.searchForCharacter(id, query);
            messageResults = `Searching character by name: ${query}`;
            break;
          case 'goodbye':
            this.props.stopApplication();
            messageResults = 'Bye! See you again.';
            break;
          default: 
            messageResults = message;
            break;
        }
      }
      else {
        messageResults = `Command \`${message}\` does not exist.`;
      }
    }
    else {
      messageResults = message;
    }
    if (!messageResults) return null;
    return { id, content: messageResults };
  }
  onSubmit = (message) => {
    this.setState({ errorMessage: '' });
    const finalMessage = this.messageConverter(message);
    if (finalMessage) {
      this.props.addMessage(finalMessage);
      return true;
    }
    return false;

  }
  render() {
    return (
      <div className="app">
        <ChatArea onSubmit={this.onSubmit} />
        <MessageBar onSubmit={this.onSubmit} />
        <ErrorMessage message={this.state.errorMessage} />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addMessage(message) {
      dispatch(addMessage(message));
    },
    updateMessage(messageId, content) {
      dispatch(updateMessage(messageId, content));
    },
    stopApplication() {
      dispatch(stopApplication());
    },
  };
}

export default connect(null, mapDispatchToProps)(App);

