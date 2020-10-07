import React from 'react';
import { Form } from 'react-bootstrap';
function index(props) {
  return (
    <div>
      <Form>
        <Form.Group>
          <Form.Label>{props.label}</Form.Label>
          <Form.Control as={props.name} custom>
            {props.data.map((data) => (
              <option>{data}</option>
            ))}
          </Form.Control>
        </Form.Group>
      </Form>
    </div>
  );
}

export default index;
