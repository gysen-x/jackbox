import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Grid, Header, Form, Segment, Button, Message,
} from 'semantic-ui-react';

import { setUser } from '../../store/actions';

export default function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userSignup, setUserSignup] = useState({ name: '', email: '', password: '' });
  const [errorSignup, setErrorSignup] = useState('');
  const [alertStyle, setAlertStyle] = useState({ display: 'none' });
  const [alertColor, setAlertColor] = useState('red');

  const handleChange = (event) => {
    setUserSignup({ ...userSignup, [event.target.name]: event.target.value });
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/auth/signup', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userSignup),
      });
      const data = await response.json();
      const { id, name } = data;
      if (response.status !== 200) {
        setErrorSignup(data.errMsg);
        setAlertStyle({ display: 'block' });
        setAlertColor('red');
      } else {
        dispatch(setUser({ id, name, isAuth: true }));
        setAlertStyle({ display: 'block' });
        setAlertColor('green');
        setErrorSignup("Well done! You're registered!");
        navigate('/');
      }
    } catch (error) {
      console.log('error: ', error);
    }
  };

  return (
    <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="black" textAlign="center">
          Sign Up
        </Header>
        <Form
          size="large"
          onSubmit={formSubmitHandler}
        >
          <Segment stacked>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="Username"
              name="name"
              value={userSignup.name}
              onChange={handleChange}
            />
            <Form.Input
              fluid
              icon="at"
              iconPosition="left"
              placeholder="E-mail address"
              type="email"
              name="email"
              value={userSignup.email}
              onChange={handleChange}
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
              name="password"
              value={userSignup.password}
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
              <p>{errorSignup}</p>
            </Message>
            <Button
              color="black"
              fluid
              size="large"
              type="submit"
            >
              Sign up
            </Button>
          </Segment>
        </Form>
        <Message>
          Have an account?
          {' '}
          <a href="/signin">Sign In</a>
        </Message>
      </Grid.Column>
    </Grid>
  );
}
