import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { commands } from '../constants';

const StyledWrapper = styled.ul`
  position: absolute;
  margin: -10px 0 0 0;
  padding: 8px 0;
  border-radius: 4px;
  top: 0;
  transform: translateY(-100%);
  background: #eee;
  box-shadow: 0px 5px 17px 0px rgba(0,0,0,.2);
  min-width: 120px;

  li {
    list-style: none;
    padding: 4px 12px;
    cursor: pointer;
    &:hover {
      background: #333;
      color: #fff;
    }
  }
`;

class SuggestedCommands extends React.Component {

  onCommandSelect = (item) => {
    const { onCommandSelect } = this.props;
    if (typeof onCommandSelect === 'function') {
      if (item === 'starwars') item += ' ';
      onCommandSelect(item);
    }
  }
  renderCommand = () => {
    return commands.map((item) => <li onClick={() => { this.onCommandSelect(item); }} key={`command-${item}`}>{ item }</li>)
  }
  render() {
    const { open } = this.props;
    return !open ? null : <StyledWrapper>
      { this.renderCommand() }
    </StyledWrapper>
  }
}

SuggestedCommands.propTypes = {
  message: PropTypes.string,
  open: PropTypes.bool,
  onCommandSelect: PropTypes.func,
};

export default SuggestedCommands;
