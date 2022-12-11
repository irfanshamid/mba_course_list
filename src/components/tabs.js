
import React from 'react';
import styled from 'styled-components';
import PropTypes from "prop-types";

const TabsComponent = styled.div`
    border-bottom: 1px solid #ddd;
    margin: 20px 30px;
    position:relative;
`;
    
const TabsList = styled.div`
    padding: 10px 10px 10px 0;
    color: ${props => props.active ? "#7800EF" : "#888"};
    font-weight: ${props => props.active ? "600" : "400"};
    border-bottom: ${props => props.active ? "2px solid #7800EF" : "1px solid #ddd"};
    position:absolute;
    bottom: -1.5px;
    cursor: pointer;
`;


export default function Tabs ({list, onClick, tabsSelected}) {

  return (
        <TabsComponent>
            {list.map((item, key) => {
                return (
                    <TabsList key={key} active={item.idx === tabsSelected} onClick={onClick}>
                        {item.name}        
                    </TabsList>
                )
            })}
        </TabsComponent>
  );
};

Tabs.propTypes = {
  list: PropTypes.array,
  onClick : PropTypes.func,
  tabsSelected: PropTypes.number
};