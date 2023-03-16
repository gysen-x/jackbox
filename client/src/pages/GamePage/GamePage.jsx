import React from 'react';
import { Grid } from '@mui/material';
import style from './css/style.module.css';
import Chat from './Chat/Chat';
import StartGamePage from './GameField/StartGamePage/StartGamePage';
import GameFriendsPage from './GameField/GameFriendsPage/GameFriendsPage';

function GamePage() {
  return (
    <Grid className={style.gamePage} container spacing={2}>
      <Grid item xs>
        <StartGamePage />
        <GameFriendsPage />
      </Grid>
      <Grid item xs={4}>
        <Chat />
      </Grid>
    </Grid>
  );
}

export default GamePage;
