
import React from 'react';
import styled from 'styled-components';
import PropTypes from "prop-types";

const ButtonComponent = styled.button`
  background: ${props => props.primary ? "#7800EF" : "white"};
  color: ${props => props.primary ? "white" : "#7800EF"};
  

  padding: 8px;
  border: 2px solid #7800EF;
  border-radius: 8px;
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    box-shadow: 0 2px 10px -2px #cfcfdd;
  }
`;


export default function Button ({children, onClick, primary}) {

  return (
    <ButtonComponent
      primary={primary}
      onClick={onClick}
    >
      {children}
    </ButtonComponent>
  );
};

Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.string,
  ]),

  onClick : PropTypes.func,
};