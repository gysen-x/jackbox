import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import style from './css/style.module.css';
import CustomButton from '../../../../components/CustomButton/CustomButton';

function StartGamePage({ socketRef }) {
  const [ready, setReady] = useState(false);
  const { id: roomId } = useParams();

  const changeReadyStatus = () => {
    setReady(true);
    const token = localStorage.getItem('token');
    socketRef.current.emit('readyParticipants', { token, roomId });
  };

  return (
    <div className={style.startGamePage}>
      <div className={style.startButton}>
        {ready ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '20px',
            }}
          >
            <h1>Waiting for other players</h1>
            <img className={style.nyan} src="/images/nyan.gif" alt="logo" />
          </Box>
        ) : (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '20px',
            }}
          >
            <h1 className={style.readyTitle}>
              If you&apos;re ready tap the button
            </h1>
            <CustomButton handleOnClick={changeReadyStatus} type="click" title="Ready" />
          </Box>
        )}
      </div>
    </div>
  );
}

export default StartGamePage;
