/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Drawer } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { ColorModeContext } from '../../theme';
import CustomCheckbox from '../../components/CustomCheckbox/CustomCheckbox';
import CustomButton from '../../components/CustomButton/CustomButton';
import style from './style.module.css';

import { logOut } from '../../store/actions';

export default function Topbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuth = useSelector((store) => store.user);
  const colorMode = useContext(ColorModeContext);
  const [width, setWidth] = useState(window.innerWidth);
  const [state, setState] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState(open);
  };

  useEffect(() => {
    const handleResize = (event) => {
      setWidth(event.target.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const logOutHandle = () => {
    dispatch(logOut());
    navigate('/');
  };

  const list = () => (
    <Box
      sx={{
        gap: '1px',
        padding: '8px 5px',
        display: 'flex',
        flexDirection: 'column',
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <CustomButton
        width="100%"
        handleOnClick={() => navigate('/')}
        title="Homepage"
      />
      {isAuth ? (
        <>
          <CustomButton
            width="100%"
            handleOnClick={() => navigate('/profile')}
            title="Profile"
          />
          <CustomButton
            width="100%"
            handleOnClick={logOutHandle}
            title="Sign out"
          />
        </>
      ) : (
        <>
          <CustomButton
            width="100%"
            handleOnClick={() => navigate('/signin')}
            title="Sign in"
          />
          <CustomButton
            width="100%"
            handleOnClick={() => navigate('/signup')}
            title="Sign up"
          />
        </>
      )}
    </Box>
  );

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      p={2}
    >
      {width < 500 ? (
        <>
          <CustomButton
            className={style.menuButton}
            width="51px"
            height="43px"
            handleOnClick={toggleDrawer(true)}
            title="| | |"
          />
          <Drawer
            sx={{
              '.MuiDrawer-paper': {
                backgroundColor: 'transparent',
                boxShadow: 0,
              },
            }}
            anchor="top"
            open={state}
            onClose={toggleDrawer(false)}
          >
            {list()}
          </Drawer>
        </>
      )
        : (
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
        )}
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
