import './App.css';
import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';

import {ReactComponent as Add} from './assets/add.svg'
// ==== client side dummy data ==== //
import dummys from './services/dummy'

import Session from './components/session';
import Header from './components/header';
import Title from './components/title';
import Tabs from './components/tabs';
import Button from './components/button';
import {Row, Col, Form, Modal} from 'react-bootstrap';

const AddSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 10px 30px;
`

function App() {
  const [list, setList] = useState(dummys.data.sessionList);
  const [modal, setModal] = useState(false);
  const [modalList, setModalList] = useState(false);
  const [lessonIndex, setLessonIndex] = useState();
  const [edit, setEdit] = useState(false);
  const [newSession, setNewSession] = useState({
      idx: dummys.data.sessionList.length + 1, 
      name: '',
      list: []
  });

  const [newListSession, setNewListSession] = useState(
    {
      type: 1,
      required: true,
      preview: true,
      date: '',
      time: '',
      download: true,
      link: ''
    }
  )
  
  const part = dummys.data.part
  const tabList = dummys.data.tabList

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

  const editSessionAction = (x, data) => {
    setLessonIndex(x)
    setNewSession({...newSession, name: data})
    setEdit(true);
    setModal(true);
  }

  const addLessonAction = (x) => {
    setLessonIndex(x)
    setModalList(true)
  }

  const addSession = () => {
    const newListing = [...list];
    newListing.push(newSession)
    setList(newListing);
    setModal(false)
  }

  const editSession = () => {
    const newListing = [...list];
    newListing[lessonIndex].name = newSession.name
    setList(newListing);
    setModal(false)
    setEdit(false);
  }

  const addSessionList = () => {
    const newListing = [...list];
    newListing[lessonIndex].list.push(newListSession)
    setList(newListing);
    setModalList(false)
  }

  return (
    <div className="App">
      <Header prev>Event</Header>
      <Title desc={part.desc} date={part.date} preview/>
      <Tabs list={tabList} tabsSelected={1}/>
      {
        list && list.map((item, key) => {
          return(
            <div 
              key={key} 
              onDragStart={(e) => dragStart(e, key)}
              onDragEnter={(e) => dragEnter(e, key)}
              onDragEnd={drop}
              draggable
            >
              <Session 
                names={item.name} 
                items={item.list}
                addAction={() => addLessonAction(key)}
                editSession={() => editSessionAction(key, item.name)}
              />
            </div>
          )
        })
      }

      <AddSection>
        <Button primary onClick={() => setModal(true)}>
          <Add/>
          <div style={{marginLeft: "10px"}}>
            Add Session
            </div>
        </Button>
      </AddSection>

      <Modal show={modal} onHide={() => setModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Session</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={12}>
              <Form.Group className="mb-2">
                <Form.Label>Name</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Type session name" 
                  onChange={(e) => setNewSession({...newSession, name: e.target.value})}
                  value={newSession.name}
                />
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setModal(false)}>
            Close
          </Button>
          <Button primary onClick={() => edit ? editSession() : addSession()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={modalList} onHide={() => setModalList(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Session</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className='m-0'>
            <Col md={12} className='mb-2'>
              <Form.Group className="mb-2">
                <Form.Label>Type</Form.Label>
                <Form.Select 
                  aria-label="Select session type"
                  value={newListSession.type}
                  onChange={(e) => setNewListSession({...newListSession, type: e.target.value})}
                >
                  <option>Session Type</option>
                  <option value={1}>Video</option>
                  <option value={2}>Onsite</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6} className='mb-2'>
              <Form.Group className="mb-2">
                <Form.Label>Date</Form.Label>
                <Form.Control 
                  type="date" 
                  value={newListSession.date}
                  onChange={(e) => setNewListSession({...newListSession, date: e.target.value})}/>
              </Form.Group>
            </Col>

            <Col md={6} className='mb-2'>
              <Form.Group className="mb-2">
                <Form.Label>Duration</Form.Label>
                <Form.Control 
                  value={newListSession.duration}
                  type="time" 
                  onChange={(e) => setNewListSession({...newListSession, time: e.target.value})}
                />
              </Form.Group>
            </Col>

            <Col md={4} className='mb-2'>
              <Form.Group className="mb-2">
                <Form.Label>Required</Form.Label>
                <Form.Check
                  checked={newListSession.required}
                  onChange={(e) => setNewListSession({...newListSession, required: e.target.checked})}
                  type="switch"
                  id="custom-switch"
                  label="Switch on"
                />
              </Form.Group>
            </Col>

            <Col md={4} className='mb-2'>
              <Form.Group className="mb-2">
                <Form.Label>Downloadable</Form.Label>
                <Form.Check 
                  checked={newListSession.download}
                  onChange={(e) => setNewListSession({...newListSession, download: e.target.checked})}
                  type="switch"
                  id="custom-switch"
                  label="Switch on"
                />
              </Form.Group>
            </Col>

            <Col md={4} className='mb-2'>
              <Form.Group className="mb-2">
                <Form.Label>Preview</Form.Label>
                <Form.Check 
                  checked={newListSession.preview}
                  onChange={(e) => setNewListSession({...newListSession, preview: e.target.checked})}
                  type="switch"
                  id="custom-switch"
                  label="Switch on"
                />
              </Form.Group>
            </Col>

            <Col md={12} className='mb-2'>
              <Form.Group className="mb-2">
                <Form.Label>Link</Form.Label>
                <Form.Control 
                  type="text" 
                  value={newListSession.link}
                  placeholder="Lesson material link" 
                  onChange={(e) => setNewListSession({...newListSession, link: e.target.value})}/>
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setModalList(false)}>
            Close
          </Button>
          <Button primary onClick={() => addSessionList()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>

  );
}

export default App;
