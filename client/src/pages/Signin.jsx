import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  Grid, Header, Form, Segment, Button, Message,
} from 'semantic-ui-react';

import { setUser } from '../store/actions';

export default function Signin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userSignin, setUserSignin] = useState({ email: '', password: '' });
  const [errorSignin, setErrorSignin] = useState('');
  const [alertStyle, setAlertStyle] = useState({ display: 'none' });
  const [alertColor, setAlertColor] = useState('red');

  const handleChange = (event) => {
    setUserSignin({ ...userSignin, [event.target.name]: event.target.value });
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('auth/signin', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(userSignin),
      });
      const data = await response.json();
      const { id, name } = data;
      if (response.status !== 200) {
        setErrorSignin(data.errMsg);
        setAlertStyle({ display: 'block' });
        setAlertColor('red');
      } else {
        dispatch(setUser({ id, name, isAuth: true }));
        setAlertStyle({ display: 'block' });
        setAlertColor('green');
        setErrorSignin("Well done! You're logged in!");
      }
      setUserSignin({ username: '', email: '', password: '' });
      navigate('/');
    } catch (error) {
      console.log('error: ', error);
    }
  };

  return (
    <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="black" textAlign="center">
          Sign In
        </Header>
        <Form
          size="large"
          onSubmit={formSubmitHandler}
        >
          <Segment stacked>
            <Form.Input
              fluid
              icon="at"
              type="email"
              name="email"
              iconPosition="left"
              placeholder="E-mail address"
              onChange={handleChange}
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
              name="password"
              onChange={handleChange}
            />
            <Message
              className="error-message"
              color={alertColor}
              style={alertStyle}
            >
              <Message.Header>
                {alertColor === 'red' ? 'Error' : 'Success'}
              </Message.Header>
              <p>{errorSignin}</p>
            </Message>
            <Button color="black" fluid size="large">
              Sign in
            </Button>
          </Segment>
        </Form>
        <Message>
          New to us?
          {' '}
          <a href="/signup">Sign Up</a>
        </Message>
      </Grid.Column>
    </Grid>
  );
}
