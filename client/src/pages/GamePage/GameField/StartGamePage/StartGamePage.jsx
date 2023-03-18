import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import style from './css/style.module.css';
import CustomButton from '../../../../components/CustomButton/CustomButton';

function StartGamePage({ socketRef }) {
  const [ready, setReady] = useState(false);
  const [allReady, setAllReady] = useState([]);

  const changeReadyStatus = () => {
    setReady(true);
    setAllReady([...allReady, true]);
    const token = localStorage.getItem('token');
    const { id: roomId } = useParams();
    socketRef.current.emit('readyParticipants', { token, roomId });
  };

  console.log(ready, allReady);

  return (
    <div className={style.startGamePage}>
      <div className={style.startButton}>
        {ready ? (
          <>
            <h1>Waiting for other players</h1>
            <img className={style.nyan} src="/images/nyan.gif" alt="logo" />
          </>
        ) : (
          <>
            <h1 className={style.readyTitle}>
              If you&apos;re ready tap the button
            </h1>
            <CustomButton handleOnClick={changeReadyStatus} type="click" title="Ready" />
          </>
        )}
      </div>
    </div>
  );
}

export default StartGamePage;
