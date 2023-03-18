import React, { useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { Grid } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import style from './css/style.module.css';
import Chat from './Chat/Chat';
import StartGamePage from './GameField/StartGamePage/StartGamePage';
// import VoteGamePage from './GameField/VoteGamePage/VoteGamePage';
// import ResultsGamePage from './GameField/ResultsGamePage/ResultsGamePage';
import GameParticipantsPage from './GameField/GameParticipantsPage/GameFriendsPage';

const SERVER_URL = 'http://localhost:3000';

function GamePage() {
  const socketRef = useRef(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    socketRef.current = io(SERVER_URL);
    socketRef.current.emit('connection');
    socketRef.current.on('destroyRoom', ({ id: roomId }) => {
      if (id === roomId) navigate('/');
    });
    return function disconnect() {
      const token = localStorage.getItem('token');
      socketRef.current.emit('disconnectRoom', { id, token });
    };
  }, []);

  // На выход из комнаты
  const handleClick = () => {
    const token = localStorage.getItem('token');
    socketRef.current.emit('disconnectRoom', { id, token });
    navigate('/');
  };

  return (
    <Grid className={style.gamePage} container spacing={2}>
      <Grid item xs>
        <StartGamePage socketRef={socketRef} />
        {/* <ResultsGamePage /> */}
        <GameParticipantsPage socketRef={socketRef} handleClick={handleClick} />
      </Grid>
      <Grid item xs={4}>
        <Chat socketRef={socketRef} />
      </Grid>
    </Grid>
  );
}

export default GamePage;
