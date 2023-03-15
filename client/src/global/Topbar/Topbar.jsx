/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext } from 'react';
import { Box, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ColorModeContext } from '../../theme';
import CustomCheckbox from '../../components/CustomCheckbox/CustomCheckbox';
import logOut from '../../store';

import './Topbar.css';

export default function Topbar() {
  const dispatch = useDispatch();
  const isAuth = useSelector((store) => store.user);
  const colorMode = useContext(ColorModeContext);

  return (
    <Box
      display="flex"
      justifyContent="flex-end"
      p={2}
    >
      <Box>
        <Link to="/"> Homepage</Link>
        {isAuth ? (
          <>
            <Link to="/profile"> Profile</Link>
            <Button
              onClick={() => dispatch(logOut())}
            >
              Signout
            </Button>
          </>
        ) : (
          <>
            <Link to="/signin"> Signin</Link>
            <Link to="/signup"> Signup</Link>
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
