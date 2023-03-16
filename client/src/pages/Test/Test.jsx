import { Box } from '@mui/material';
import React from 'react';
import Rooms from './Rooms';
import SelectGames from './SelectGames';
import GameSetup from './GameSetup';

export default function Test() {
  return (
    <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gridAutoRows="140px" gap="20px">
      <Box gridColumn="span 6">
        <Rooms />
      </Box>
      <Box gridColumn="span 4">
        <GameSetup />
        <SelectGames />
      </Box>
    </Box>
  );
}
