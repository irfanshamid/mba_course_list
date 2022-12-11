
import React from 'react';
import styled from 'styled-components';
import PropTypes from "prop-types";
import {ReactComponent as ArrowLeft} from './../assets/arrow_left.svg'

const HeaderComponent = styled.div`
  background: #fff;
  position: sticky;
  box-shadow: 0 2px 10px -2px #cfcfdd;
  display: flex;
  align-items: center; 
  font-weight: 600;
  padding: ${props => props.prev ? "10px 30px" : "20px 30px"};
`;

const IconHeaderComponent = styled.div`
    padding: 10px 20px 10px 50px;
    border-right: 1px solid #ddd;
    margin-right: 20px;
`;

export default function Header ({children, prev}) {

  return (
    <HeaderComponent prev={prev}>
        {prev &&
            <IconHeaderComponent>
                <ArrowLeft/>
            </IconHeaderComponent>
        }
        {children}
    </HeaderComponent>
  );
};

Header.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.string,
  ]),
  onClick : PropTypes.func,
};