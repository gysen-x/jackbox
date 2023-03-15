/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext } from 'react';
import {Link} from 'react-router-dom'
import { Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { ColorModeContext } from '../../theme';
import CustomCheckbox from '../../components/CustomCheckbox/CustomCheckbox';
import CustomButton from '../../components/CustomButton/CustomButton'
import style from './style.module.css'

import { logOut } from '../../store/actions';


import './Topbar.css';

export default function Topbar() {
  const dispatch = useDispatch();
  const isAuth = useSelector((store) => store.user);
  const colorMode = useContext(ColorModeContext);

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      p={2}
    >
      <Box className={style.nav__box}>
      <CustomButton
        to="/"
        title='Homepage'
        />
        {isAuth ? (
          <>
       <CustomButton
        as={Link}
        to="/profile"
        title='Profile'
        />
        <CustomButton
        onClick={() => dispatch(logOut())}
        title='Sign out'
        />
          </>
        ) : (
          <>
        <CustomButton
        to="/signin"
        title='Sign in'
        />
        <CustomButton
        to="/signup"
        title='Sign up'
        />
          </>
        )}
      </Box>
      <Box display="flex">
        <CustomCheckbox
          onChange={colorMode.toggleColorMode}
        />
      </Box>
    </Box>
  );
}
