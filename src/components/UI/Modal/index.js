import React from 'react';
import { Modal, Button } from 'react-bootstrap';
function Model(props) {
  //console.log(props);
  return (
    <Modal show={props.show} onHide={props.onHide} size={props.size}>
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.children}</Modal.Body>
      <Modal.Footer>
        {props.button ? (
          <Button variant='primary' onClick={props.onClick}>
            {props.button}
          </Button>
        ) : null}
      </Modal.Footer>
    </Modal>
  );
}

export default Model;
