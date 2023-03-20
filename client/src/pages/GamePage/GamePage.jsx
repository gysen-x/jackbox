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
// import WaitingGamepage from './GameField/WaitingGamepage/WaitingGamepage';
import VoteGamePage from './GameField/VoteGamePage/VoteGamePage';
import ShowRoundPage from './GameField/ShowRoundPage/ShowRoundPage';
import ResultsGamePage from './GameField/ResultsGamePage/ResultsGamePage';

const SERVER_URL = 'http://localhost:3000';

function GamePage() {
  const user = useSelector((store) => store.user);
  const socketRef = useRef(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('start');
  const [punchData, setPunchData] = useState('');
  const [voteData, setVoteData] = useState({});
  const [currentRound, setCurrentRound] = useState(1);

  useEffect(() => {
    socketRef.current = io(SERVER_URL);
    socketRef.current.emit('connection');

    socketRef.current.on('destroyRoom', ({ id: roomId }) => {
      if (id === roomId) navigate('/');
    });

    socketRef.current.on('everybodyReady', ({ roomId, data, round }) => {
      if (id === roomId) {
        setCurrentRound(round);
        data.forEach((elem) => {
          if (elem.pairs.includes(user.userid)) {
            setPunchData(elem.punch);
          }
        });
        setStatus('showround');
        setTimeout(() => setStatus('game'), 1500);
      }
    });

    socketRef.current.on('everybodyAnswers', ({ roomId, firstVoteData }) => {
      if (id === roomId) {
        setVoteData(firstVoteData);
        setStatus('everybodyAnswers');
        setTimeout(() => setStatus('voting'), 1500);
      }
    });

    socketRef.current.on('nextVote', ({ roomId, nextVote, userId }) => {
      if (id === roomId && userId === user.userid) {
        setVoteData(nextVote);
      }
    });

    socketRef.current.on('everybodyVote', ({
      roomId, round, data,
    }) => {
      if (id === roomId) {
        setCurrentRound(round);
        data.forEach((elem) => {
          if (elem.pairs.includes(user.userid)) {
            setPunchData(elem.punch);
          }
        });
        setStatus('showround');
        setTimeout(() => setStatus('game'), 1500);
      }
    });

    socketRef.current.on('gameFinished', ({ roomId }) => {
      if (id === roomId) {
        setStatus('finished');
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
        {status === 'game' && (
        <PunchGamePage
          status={status}
          setStatus={setStatus}
          punchData={punchData}
          socketRef={socketRef}
        />
        )}
        {status === 'showround' && <ShowRoundPage round={currentRound} />}
        {status === 'everybodyAnswers'
         && (
         <p>все ответили</p>
         )}
        {status === 'voting'
        && (
        <VoteGamePage
          socketRef={socketRef}
          voteData={voteData}
        />
        )}
        {status === 'finished'
        && (
        <ResultsGamePage />
        )}
        <GameParticipantsPage socketRef={socketRef} handleClick={handleClick} />
      </Grid>
      <Grid item xs={4}>
        <Chat socketRef={socketRef} />
      </Grid>
    </Grid>
  );
}

export default GamePage;
