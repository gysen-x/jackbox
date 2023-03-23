import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../../store/actions';

import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import style from './style.module.css';
import CustomTooltip from '../../components/CustomTooltip/CustomTooltip';
import url from '../../url';

export default function Signin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userSignin, setUserSignin] = useState({ email: '', password: '' });
  const [errorSignin, setErrorSignin] = useState('');
  const [openTooltipSignin, setTooltipSignin] = useState(false);
  const [openTooltipUser, setTooltipUser] = useState(false);

  const handleChange = (event) => {
    setUserSignin({ ...userSignin, [event.target.name]: event.target.value });
  };

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    const emailValidation = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (userSignin.email.match(emailValidation)) {
      try {
        const response = await fetch(`${url}/auth/signin `, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userSignin),
        });
        if (response.status !== 200) {
          const data = await response.json();
          setErrorSignin(capitalize(data.errMsg));
          setTooltipUser(true);
        } else {
          const result = await response.json();
          const { user, token } = result;
          localStorage.setItem('token', token);
          dispatch(setUser(user));
          navigate('/');
        }
        setUserSignin({ username: '', email: '', password: '' });
      } catch (error) {
        console.log('error: ', error);
        setErrorSignin('Fail. Try later.');
        setTooltipUser(true);
      }
    } else {
      setErrorSignin('Incorrect email');
      setTooltipSignin(true);
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
          className={style.signin__form}
          onSubmit={formSubmitHandler}
        >
          <h1 className={style.signin__title}> Sign In</h1>
          <CustomTooltip
            message={errorSignin}
            openTooltip={openTooltipSignin}
            setOpenTooltip={setTooltipSignin}
            inner={(
              <CustomInput
                title="Email"
                className="form-control"
                id="exampleInputEmail1"
                type="text"
                name="email"
                value={userSignin.email}
                onChange={handleChange}
                placeholder="Enter your email..."
              />
          )}
          />
          <CustomInput
            title="Password"
            className="form-control"
            id="exampleInputPassword1"
            type="password"
            name="password"
            value={userSignin.password}
            onChange={handleChange}
            placeholder="Enter your password..."
          />
          <CustomTooltip
            message={errorSignin}
            openTooltip={openTooltipUser}
            setOpenTooltip={setTooltipUser}
            inner={(
              <CustomButton
                className={style.form__button}
                id="signUp"
                title="Submit"
                color="#fe9e84"
                type="submit"
              />
          )}
          />
        </form>
      </Box>
    </Container>
  );
}
