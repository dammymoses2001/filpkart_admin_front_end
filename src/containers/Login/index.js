import React, { useState } from 'react';
import Layout from '../../components/Layout';
import Input from '../../components/UI/Input';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { loginAction, isUserLoggedIn } from '../../redux/actions';
import { Redirect } from 'react-router-dom';

function Login({ loginAction, history, user }) {
  //console.log(user);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const userLogin = (e) => {
    e.preventDefault();
    const user = {
      email,
      password,
    };
    loginAction(user);
    history.push('/');
  };
  //console.log(auth.authenticate);

  if (user.authenticate) {
    return <Redirect to='/' />;
  }

  return (
    <div>
      <Layout>
        <Container>
          <Row className='m-5 '>
            <Col md={{ span: 6, offset: 3 }} style={{ marginTop: '40px' }}>
              <Form onSubmit={userLogin}>
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
});

const mapDispatchToProps = (dispatch) => {
  return {
    loginAction: (user) => dispatch(loginAction(user)),
    isUserLoggedIn: () => dispatch(isUserLoggedIn()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
