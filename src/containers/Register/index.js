import React, { useState } from 'react';
import Layout from '../../components/Layout';
import Input from '../../components/UI/Input';
import { connect } from 'react-redux';
import { RegisterAction } from '../../redux/actions/';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

function Register({ user, RegisterAction, register }) {
  /////
  console.log(register);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const registerUser = (e) => {
    e.preventDefault();
    const user = {
      firstName,
      lastName,
      email,
      password,
    };
    RegisterAction(user);
  };

  if (user.authenticate) {
    return <Redirect to='/' />;
  }

  return (
    <div>
      <Layout>
        <Container>
          <Row className='m-5'>
            <Col md={{ span: 6, offset: 3 }}>
              <Form onSubmit={registerUser}>
                <Row>
                  <Col md={6}>
                    <Input
                      label='FirstName'
                      name='firstName'
                      type='text'
                      value={firstName}
                      placeholder='First Name'
                      onChange={(e) => {
                        setFirstName(e.target.value);
                      }}
                    />
                  </Col>

                  <Col md={6}>
                    <Input
                      label='LastName'
                      name='lastName'
                      type='text'
                      value={lastName}
                      placeholder='Last Name'
                      onChange={(e) => {
                        setLastName(e.target.value);
                      }}
                    />
                  </Col>
                </Row>

                <Input
                  label='Email'
                  name='email'
                  type='email'
                  value={email}
                  placeholder='Enter Email'
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <Input
                  label='Password'
                  name='password'
                  type='password'
                  value={password}
                  placeholder='Password'
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />

                <Button variant='primary' type='submit'>
                  Submit
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </Layout>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
  register: state.register,
});

const mapDispatchToProps = (dispatch) => {
  return {
    RegisterAction: (user) => dispatch(RegisterAction(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
