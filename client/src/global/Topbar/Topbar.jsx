/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { ColorModeContext } from '../../theme';
import CustomCheckbox from '../../components/CustomCheckbox/CustomCheckbox';
import CustomButton from '../../components/CustomButton/CustomButton';
import style from './style.module.css';

import { logOut } from '../../store/actions';

import './Topbar.css';

export default function Topbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuth = useSelector((store) => store.user);
  const colorMode = useContext(ColorModeContext);

  const logOutHandle = () => {
    dispatch(logOut());
    navigate('/');
  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      p={2}
    >
      <Box className={style.nav__box}>
        <CustomButton
          handleOnClick={() => navigate('/')}
          title="Homepage"
        />
        {isAuth ? (
          <>
            <CustomButton
              handleOnClick={() => navigate('/profile')}
              title="Profile"
            />
            <CustomButton
              handleOnClick={logOutHandle}
              title="Sign out"
            />
          </>
        ) : (
          <>
            <CustomButton
              handleOnClick={() => navigate('/signin')}
              title="Sign in"
            />
            <CustomButton
              handleOnClick={() => navigate('/signup')}
              title="Sign up"
            />
          </>
        )}
      </Box>
      <Box
        display="flex"
        gap="3px"
      >
        <DarkModeIcon fontSize="small" />
        <CustomCheckbox
          onChange={colorMode.toggleColorMode}
          checked={localStorage.getItem('theme') === 'light'}
        />
        <WbSunnyIcon fontSize="small" />
      </Box>
    </Box>
  );
}
