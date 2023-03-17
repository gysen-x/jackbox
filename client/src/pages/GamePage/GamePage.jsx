import React, { useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { Grid } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import style from './css/style.module.css';
import Chat from './Chat/Chat';
import StartGamePage from './GameField/StartGamePage/StartGamePage';
import GameFriendsPage from './GameField/GameFriendsPage/GameFriendsPage';

const SERVER_URL = 'http://localhost:3000';

function GamePage() {
  const socketRef = useRef(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    socketRef.current = io(SERVER_URL);
    socketRef.current.emit('connection');
    socketRef.current.on('destroyRoom', ({ id: roomId }) => {
      if (id === roomId) navigate('/rooms');
    });
  }, []);

  // На выход из комнаты
  const handleClick = () => {
    const token = localStorage.getItem('token');
    socketRef.current.emit('disconnectRoom', { id, token });
    navigate('/rooms');
  };

  return (
    <Grid className={style.gamePage} container spacing={2}>
      <Grid item xs>
        <StartGamePage />
        <GameFriendsPage handleClick={handleClick} />
      </Grid>
      <Grid item xs={4}>
        <Chat socketRef={socketRef} />
      </Grid>
    </Grid>
  );
}

export default GamePage;
