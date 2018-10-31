import React from "react";
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledMessage = styled.div`
  color: red;
  font-size: 12px;
  padding-left: 12px;
  position: absolute;
  bottom: 30px;
`;
const ErrorMessage = props => {
  const { message } = props;
  return <StyledMessage>{ message }</StyledMessage>
}

ErrorMessage.defaultProps = {
  message: ' '
};

ErrorMessage.propTypes = {
  message: PropTypes.string
};
export default ErrorMessage;

