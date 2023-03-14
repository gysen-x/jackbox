import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../../store/actions';
import CustomButton from '../../components/CustomButton/CustomButton';

import './Signup.css';
import CustomInput from '../../components/CustomInput/CustomInput';

export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
        navigate('/');
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
          <CustomInput
            className="input"
            title="Username"
            type="text"
            name="login"
            value={userSignup.login}
            onChange={handleChange}
            placeholder="Enter your name..."
          />
          <CustomInput
            className="input"
            title="Email"
            type="email"
            name="email"
            value={userSignup.email}
            onChange={handleChange}
            placeholder="Enter your email..."
          />

          <div
            id="emailHelp"
            className="form-text"
          >
            We&apos;ll never share your email with anyone else.
          </div>
          <div className="mb-3">

            <CustomInput
              className="input"
              type="password"
              name="password"
              value={userSignup.password}
              onChange={handleChange}
              placeholder="Enter your email..."
            />
          </div>
          <div className={alertClass} role="alert">
            {errorSignup}
          </div>
          <CustomButton
            id="signUp"
            title="Submit"
            color="#fe9e84"
            type="submit"
          />
        </form>
      </Box>
    </Container>
  );
}
