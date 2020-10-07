import React from 'react';
import { Form } from 'react-bootstrap';

export default function Input(props) {
  return (
    <div>
      <Form.Group controlId={props.name}>
        {props.label ? (
          <Form.Label column='sm' lg={2}>
            {props.label}
          </Form.Label>
        ) : null}

        <Form.Control
          size='sm'
          className={props.className}
          type={props.type}
          name={props.name}
          value={props.value}
          accept={props.accept}
          placeholder={props.placeholder}
          onChange={props.onChange}
        />
        <Form.Text className='text-muted'>{props.errorMessage}</Form.Text>
      </Form.Group>
    </div>
  );
}
