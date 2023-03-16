import { Grid } from '@mui/material';
import React from 'react';
import Rooms from '../Rooms/Rooms';
import SelectGames from '../SelectGames/SelectGames';

export default function Test() {
  return (
    <Grid container spacing={2}>
      <Grid Box xs={8}>
        <Rooms />
      </Grid>
      <Grid Box xs={4}>
        <SelectGames />
      </Grid>
    </Grid>
  );
}
