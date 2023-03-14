/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext } from 'react';
import { Box, useTheme } from '@mui/material';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { ColorModeContext, tokens } from '../../theme';

import './Topbar.css';

export default function Topbar() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      p={2}
    >
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        <InputBase
          sx={{ ml: 2, flex: 1 }}
          placeholder="Search"
        >
          <SearchIcon />
        </InputBase>
      </Box>

      <Box display="flex">
        <label htmlFor="check" className="switch">
          <input
            id="check"
            type="checkbox"
            onChange={colorMode.toggleColorMode}
          />
          <span className="slider" />
        </label>

      </Box>
    </Box>
  );
}
