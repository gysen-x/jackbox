import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../../store/actions';
import CustomButton from '../../components/CustomButton/CustomButton';

import style from './style.module.css';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomTooltip from '../../components/CustomTooltip/CustomTooltip';

export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userSignup, setUserSignup] = useState({ login: '', email: '', password: '' });
  const [errorSignup, setErrorSignup] = useState('');
  const [openTooltipSignup, setTooltipSignup] = useState(false);

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  const handleChange = (event) => {
    setUserSignup({ ...userSignup, [event.target.name]: event.target.value });
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    const emailValidation = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (userSignup.email.match(emailValidation)) {
      try {
        const response = await fetch('http://localhost:3000/auth/signup ', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userSignup),
        });
        if (response.status !== 200) {
          const data = await response.json();
          setErrorSignup(capitalize(data.errMsg));
          setTooltipSignup(true);
        } else {
          const result = await response.json();
          const { user, token } = result;
          localStorage.setItem('token', token);
          dispatch(setUser(user));
          navigate('/');
        }
        setUserSignup({ login: '', email: '', password: '' });
      } catch (error) {
        console.log('error: ', error);
        setErrorSignup('Fail. Try later.');
        setTooltipSignup(true);
      }
    } else {
      setErrorSignup('Incorrect email');
      setTooltipSignup(true);
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
          className={style.signup__form}
          onSubmit={formSubmitHandler}
        >
          <h1 className={style.signup__title}> Sign Up</h1>
          <CustomInput
            className="input"
            title="Username"
            type="text"
            name="login"
            value={userSignup.login}
            onChange={handleChange}
            placeholder="Enter your name..."
          />
          <CustomTooltip
            message={errorSignup}
            openTooltip={openTooltipSignup}
            setOpenTooltip={setTooltipSignup}
            inner={(
              <CustomInput
                className="input"
                title="Email"
                type="text"
                name="email"
                value={userSignup.email}
                onChange={handleChange}
                placeholder="Enter your email..."
              />
        )}
          />

          <CustomInput
            title="Password"
            className="input"
            type="password"
            name="password"
            value={userSignup.password}
            onChange={handleChange}
            placeholder="Enter your password..."
          />
          <div
            id="emailHelp"
            className="form-text"
          >
            We&apos;ll never share email with anyone.
          </div>
          <CustomButton
            className={style.form__button}
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
