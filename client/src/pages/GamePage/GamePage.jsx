import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';
import { Box, Grid } from '@mui/material';
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
import CustomButton from '../../components/CustomButton/CustomButton';

import url from '../../url';
import socketUrl from '../../socketUrl';

function GamePage() {
  const user = useSelector((store) => store.user);
  const socketRef = useRef(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('start');
  const [punchData, setPunchData] = useState('');
  const [voteData, setVoteData] = useState({});
  const [currentRound, setCurrentRound] = useState(1);
  const [results, setResults] = useState({});
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetch(`${url}/rooms/${id}/check`, {
      headers: {
        Authentication: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => {
        if (res.status === 401) {
          navigate('/');
        }
      })
      .catch((error) => console.error(error));

    socketRef.current = io(socketUrl);
    socketRef.current.emit('connection');

    window.addEventListener('unload', () => {
      socketRef.current.emit('disconnectRoom', { id, token });
    });

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

    socketRef.current.on('gameFinished', ({ roomId, participants, finalBestPunch }) => {
      if (id === roomId) {
        const topThreeResults = participants
          .sort((a, b) => b.pointsInGame - a.pointsInGame)
          .slice(0, 3);
        setResults({
          finalBestPunch,
          topThreeResults,
        });
        setStatus('finished');
      }
    });

    return function disconnect() {
      socketRef.current.emit('disconnectRoom', { id, token });
    };
  }, []);

  // На выход из комнаты
  const handleClick = () => {
    socketRef.current.emit('disconnectRoom', { id, token });
    navigate('/');
  };

  return (
    <Grid
      sx={{
        padding: '10px',
        minWidth: '500px',
        flexWrap: 'wrap',
        justifyContent: 'center',
      }}
      className={style.gamePage}
      container
      spacing={2}
    >
      <Grid
        sx={{
          minWidth: '600px',
        }}
        item
        xs
      >
        <Box
          sx={{
            textAlign: 'center',
            color: 'azure',
          }}
          className="homepageH1"
        >
          Rhymes and Punches

        </Box>
        <Box
          sx={{
            borderRadius: '20px',
            overflow: 'hidden',
            position: 'relative',
            border: '2px solid #333',
            boxShadow: '0 0.4rem #333',
          }}
        >
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
                <div className={style.GamePage__everybodyAnswers}>
                  <img className={style.GamePage__nyan} src="/images/nyan.gif" alt="logo" />
                </div>
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
                <ResultsGamePage results={results} />
                )}
          <Box
            sx={{
              position: 'absolute',
              zIndex: '1000',
              bottom: '10px',
              right: '10px',
            }}
          >
            <CustomButton color="#c41e3a" title="Quit" handleOnClick={handleClick} />
          </Box>
        </Box>
        <GameParticipantsPage status={status} socketRef={socketRef} handleClick={handleClick} />
      </Grid>
      <Grid
        item
        xs={4}
        sx={{
          minWidth: '400px',
        }}
      >
        <Chat socketRef={socketRef} />
      </Grid>
    </Grid>
  );
}

export default GamePage;
