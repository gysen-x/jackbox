/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext } from 'react';
import { Box } from '@mui/material';
import { ColorModeContext } from '../../theme';

import './Topbar.css';
import CustomCheckbox from '../../components/CustomCheckbox/CustomCheckbox';

export default function Topbar() {
  const colorMode = useContext(ColorModeContext);

  return (
    <Box
      display="flex"
      justifyContent="flex-end"
      p={2}
    >
      <Box display="flex">
        <CustomCheckbox
          onChange={colorMode.toggleColorMode}
        />
      </Box>
    </Box>
  );
}
