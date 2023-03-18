import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CustomInput from '../../../../components/CustomInput/CustomInput';
import CustomButton from '../../../../components/CustomButton/CustomButton';
import { Timer } from '../StartGamePage/Timer/Timer';

import style from './style.module.css';

export default function PunchGamePage({ socketRef, punchData }) {
  const [timeoutId, setTimeoutId] = useState(null);
  const [punchInput, setPunchInput] = useState('');
  const [waiting, setWaiting] = useState(false);
  const { id: roomId } = useParams();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const timer = setTimeout(() => {
      console.log('timer is working: ', token);
      // socketRef.current.emit('pushAnswer', ({ punchInput, token, roomId }));
    }, 30000);
    setTimeoutId(timer);
  }, []);

  const handlePunchInput = (event) => {
    setPunchInput(event.target.value);
  };

  const giveAnswer = (event) => {
    event.preventDefault();
    clearTimeout(timeoutId);
    setTimeoutId(null);
    const token = localStorage.getItem('token');
    setWaiting(true);
    socketRef.current.emit('pushAnswer', ({ punchInput, token, roomId }));
  };

  return (
    <div className={style.PunchGamePage}>
      {!waiting ? (
        <div className={style.PunchGamePage__container}>
          <h1 className={style.PunchGamePage__title}>{punchData}</h1>
          <form className={style.PunchGamePage__form}>
            <CustomInput
              onChange={handlePunchInput}
              value={punchInput}
              placeholder="Enter your punch..."
              type="text"
            />
            <CustomButton
              handleOnClick={giveAnswer}
              type="submit"
              title="Send"
              color="#fe9e84"
            />
          </form>
        </div>
      ) : (
        <img className="nyan" src="/images/nyan.gif" alt="logo" />
      )}
      <Timer className={style.PunchGamePage__timer} />
    </div>
  );
}
