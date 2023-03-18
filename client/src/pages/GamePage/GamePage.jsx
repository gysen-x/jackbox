import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';
import { Grid } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import style from './css/style.module.css';
import Chat from './Chat/Chat';
import StartGamePage from './GameField/StartGamePage/StartGamePage';
// import VoteGamePage from './GameField/VoteGamePage/VoteGamePage';
// import ResultsGamePage from './GameField/ResultsGamePage/ResultsGamePage';
import GameParticipantsPage from './GameField/GameParticipantsPage/GameParticipantsPage';
import PunchGamePage from './GameField/PunchGamePage/PunchGamePage';
import WaitingGamepage from './GameField/WaitingGamepage/WaitingGamepage';
import VoteGamePage from './GameField/VoteGamePage/VoteGamePage';

const SERVER_URL = 'http://localhost:3000';

function GamePage() {
  const user = useSelector((store) => store.user);
  const socketRef = useRef(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('start');
  const [punchData, setPunchData] = useState('');

  useEffect(() => {
    socketRef.current = io(SERVER_URL);
    socketRef.current.emit('connection');

    socketRef.current.on('destroyRoom', ({ id: roomId }) => {
      if (id === roomId) navigate('/');
    });

    socketRef.current.on('everybodyReady', ({ roomId, data }) => {
      if (id === roomId) {
        data.forEach((elem) => {
          if (elem.pairs.includes(user.userid)) {
            setPunchData(elem.punch);
          }
        });
        setStatus('everybodyReady');
        setTimeout(() => setStatus('game'), 1500);
      }
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
        {status === 'start' && <StartGamePage socketRef={socketRef} />}
        {status === 'everybodyReady' && <p>Все готовы, поехали</p>}
        {status === 'game' && (
        <PunchGamePage
          status={status}
          setStatus={setStatus}
          punchData={punchData}
          socketRef={socketRef}
        />
        )}
        {status === 'waiting' && <WaitingGamepage />}
        {status === 'voting' && <VoteGamePage />}
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
