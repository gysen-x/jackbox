import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../../store/actions';

import './Signin.css';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';

export default function Signin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userSignin, setUserSignin] = useState({ email: '', password: '' });
  const [errorSignin, setErrorSignin] = useState('');
  const [alertClass, setAlertClass] = useState('d-none');

  const handleChange = (event) => {
    setUserSignin({ ...userSignin, [event.target.name]: event.target.value });
    console.log('user: ', userSignin);
  };

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/auth/signin ', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userSignin),
      });
      if (response.status !== 200) {
        const data = await response.json();
        setErrorSignin(capitalize(data.errMsg));
        setAlertClass('alert alert-danger');
      } else {
        const result = await response.json();
        const { user, token } = result;
        localStorage.setItem('token', token);
        dispatch(setUser(user));
        setAlertClass('alert alert-success');
        setErrorSignin("Well done! You're logged in!");
        navigate('/');
      }
      setUserSignin({ username: '', email: '', password: '' });
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

          <h1> Sign In</h1>
          <CustomInput
            title="Username"
            className="form-control"
            id="exampleInputEmail1"
            type="email"
            name="email"
            value={userSignin.email}
            onChange={handleChange}
            placeholder="Enter your name..."
          />
          <CustomInput
            title="Email"
            className="form-control"
            id="exampleInputPassword1"
            type="password"
            name="password"
            value={userSignin.password}
            onChange={handleChange}
            placeholder="Enter your password..."
          />
          <div className={alertClass} role="alert">
            {errorSignin}
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
