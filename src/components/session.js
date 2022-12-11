import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import {ReactComponent as Handle} from './../assets/handle.svg'
import {ReactComponent as Add} from './../assets/add.svg'
import {ReactComponent as Location} from './../assets/location.svg'
import {ReactComponent as Video} from './../assets/video.svg'
import {ReactComponent as Clock} from './../assets/clock.svg'
import {ReactComponent as Download} from './../assets/download.svg'
import {ReactComponent as Edit} from './../assets/edit.svg'
import {ReactComponent as ActionHorizontal} from './../assets/action_horizontal.svg'
import {ReactComponent as ActionVertical} from './../assets/action_vertical.svg'
import Button from './button';

const SessionComponent = styled.div`
  padding: 0 30px;
`;

const Info = styled.div`
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #ddd;
  margin: 10px 0;
`;

const SessionPart = styled.div`
  padding: 10px 3px;
  border-radius: 8px;
  border: 1px solid #ddd;
  margin: 10px 0;

  transition: .1s ease-in;
  background: #FFF;
  &:hover {
    background: #FBFAFF;
    cursor: pointer;
    padding-left: 10px;
  }
`;

const ListSession = styled.div`
  padding: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;  
`;

const PreColumn = styled.div`
  padding: 0;
  display: flex;
  align-items: center;
  flex-direction: row;
`

const PreColumnItem = styled.div`
  padding: 0 10px;
  display: flex;
  align-items: center;

  &:last-child{
    padding-right : 0;
  }

  border-left: ${props => props.sideborder ? "1px solid #ddd" : "unset"};

  ${props => props.sideicon &&
    `
      &:before{
        content: '●';
        font-size: 10px;
        padding: 1px 10px 1px 0;
        color: #ddd;
      }
    `
  }
  
`

const PreColumnItemIcon = styled.div`
  padding: 8px;
  min-width: 20px;
  min-height: 20px;
  justify-content: center;
  margin-right: 5px; 
  background: ${props => props.outlined ? "#F6F8FC" : "unset"};
  border-radius: 8px;
  display: flex;
  align-items: center;

`

const SessionTitle = styled.h5`
  padding: 5px 0;
  margin: 5px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SessionItem = styled.div`
  display: flex;
  align-items: center;
  padding: 4px 10px;
  transition: .1s ease-in;
  border-radius: 8px;

  &:hover {
    background: #FBFAFF;
    cursor: pointer;
    padding-left: 3px;
  }
`;

const AddSection = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
`
 
export default function Session ({names, items, addAction, editSession}) {
 
  const [list, setList] = useState(items);
 
  const dragItem = useRef();
  const dragOverItem = useRef();

  const dragStart = (e, position) => {
    dragItem.current = position;
  };

  const dragEnter = (e, position) => {
    dragOverItem.current = position;
  };

  const drop = (e) => {
    const copyListItems = [...list];
    const dragItemContent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setList(copyListItems);
  };
  

  return (
    <SessionComponent>
      
      <SessionPart>
        <SessionTitle>
          <PreColumn>
            <>
            <Handle/>
            <PreColumnItem>
              {names}
              <PreColumnItemIcon onClick={() => editSession()}>
                <Edit/>
              </PreColumnItemIcon>
            </PreColumnItem>
            </>

          </PreColumn>
          <PreColumn>
            <PreColumnItem>
              <PreColumnItemIcon outlined style={{marginRight: '20px'}}>
                <ActionHorizontal/>
              </PreColumnItemIcon>
            </PreColumnItem>
          </PreColumn>
        </SessionTitle>
        

        {
          list && list?.map((item, index) => (
            <SessionItem
              key={index}
              onDragStart={(e) => dragStart(e, index)}
              onDragEnter={(e) => dragEnter(e, index)}
              onDragEnd={drop}
              draggable
            >
              <Handle/>
              <ListSession>
                  <PreColumn>
                    <PreColumnItem>
                      <PreColumnItemIcon outlined>
                        {item.type === 1 ? <Video/> : <Location/>}
                      </PreColumnItemIcon>
                      Judul {item.type === 1 ? 'video' : 'onsite'}
                    </PreColumnItem>
                    <PreColumnItem style={{color: '#7800EF'}} sideborder>{item.required ? 'Required' : null}</PreColumnItem>
                    <PreColumnItem style={{color: '#8189A2'}} sideicon>{item.preview ? 'Previewable' : null}</PreColumnItem>
                  </PreColumn>

                  <PreColumn>
                    <PreColumnItem>
                      <PreColumnItemIcon>
                        <Clock/>
                      </PreColumnItemIcon>
                      {item.date}
                    </PreColumnItem>
                    <PreColumnItem sideicon>
                      <PreColumnItemIcon>
                        <Clock/>
                      </PreColumnItemIcon>
                      {item.time} Min
                    </PreColumnItem>
                    {
                      item.download &&
                    <PreColumnItem sideicon>
                      <PreColumnItemIcon>
                        <Download/>
                      </PreColumnItemIcon>
                      Downloadable  
                    </PreColumnItem>
                    }

                    <PreColumnItem nospace>
                      <PreColumnItemIcon outlined>
                        <ActionVertical/>
                      </PreColumnItemIcon>
                    </PreColumnItem>
                  </PreColumn>

              </ListSession>
            </SessionItem>
          ))
        }

          <AddSection>
            <Button primary onClick={() => addAction()}>
              <Add/>
            </Button>
            <span style={{marginLeft: '10px'}}> Add Lesson Material</span>
          </AddSection>
      </SessionPart>
    </SessionComponent>
  );
};