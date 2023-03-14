import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Box } from '@mui/material';
import { setUser } from '../../store/actions';

import './Auth.css';

export default function Signup() {
  const dispatch = useDispatch();

  const [userSignup, setUserSignup] = useState({ login: '', email: '', password: '' });
  const [errorSignup, setErrorSignup] = useState('');
  const [alertClass, setAlertClass] = useState('d-none');

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  const handleChange = (event) => {
    setUserSignup({ ...userSignup, [event.target.name]: event.target.value });
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/auth/signup ', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userSignup),
      });
      console.log('response: ', response);
      if (response.status !== 200) {
        const data = await response.json();
        setErrorSignup(capitalize(data.errMsg));
        setAlertClass('alert alert-danger');
      } else {
        const result = await response.json();
        const { user, token } = result;
        localStorage.setItem('token', token);
        dispatch(setUser(user));
        setAlertClass('alert alert-success');
        setErrorSignup("Well done! You're logged in!");
      }
      setUserSignup({ login: '', email: '', password: '' });
    } catch (error) {
      console.log('error: ', error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <form
          onSubmit={formSubmitHandler}
        >
          <h1> Sign Up</h1>
          <div className="mb-3">
            <label
              className="form-label w-100"
              htmlFor="exampleInputUsername1"
            >
              <div
                id="usernameText"
                className="form-text"
              >
                Username
              </div>
              <div
                className="input-wrapper"
                id="exampleInputUsername1"
                type="text"
                name="login"
                value={userSignup.login}
                onChange={handleChange}
              >
                <input type="text" placeholder="Type here..." name="text" className="input" />
              </div>
              <input
                id="exampleInputUsername1"
                type="text"
                name="login"
                value={userSignup.login}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="mb-3">
            <label
              className="form-label w-100"
              htmlFor="exampleInputEmail1"
            >
              <div
                id="emailText"
                className="form-text"
              >
                Email address
              </div>
              <input
                className="form-control"
                id="exampleInputEmail1"
                type="email"
                name="email"
                aria-describedby="emailHelp"
                value={userSignup.email}
                onChange={handleChange}
              />
            </label>
            <div
              id="emailHelp"
              className="form-text"
            >
              We&apos;ll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label
              className="form-label w-100"
              htmlFor="exampleInputPassword1"
            >
              <div
                id="passwordText"
                className="form-text"
              >
                Password
              </div>

              <input
                className="form-control mb-3"
                id="exampleInputPassword1"
                type="password"
                name="password"
                value={userSignup.password}
                onChange={handleChange}
              />
            </label>
            <div className={alertClass} role="alert">
              {errorSignup}
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
          >
            Submit
          </button>
        </form>
      </Box>
    </Container>
  );
}
