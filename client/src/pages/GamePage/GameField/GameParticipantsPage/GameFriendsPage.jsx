/* eslint-disable no-unused-vars */
import { Avatar } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import style from './style.module.css';
import CustomButton from '../../../../components/CustomButton/CustomButton';

export default function GameParticipantsPage({ socketRef, handleClick }) {
  const [participants, setParticipants] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    fetch(`/rooms/${id}/participants`)
      .then((res) => res.json())
      .then((data) => setParticipants(data))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on('checkEnterToRoom', ({ id: roomId, user }) => {
        console.log('user', user);
        if (id === roomId) {
          setParticipants([...participants, user]);
        }
      });
    }
  }, [participants]);

  return (
    <div>
      <div className={style.gamefriends__title}>
        <CustomButton color="#c41e3a" title="Quit" handleOnClick={handleClick} />
        <h1 className={style.title}>Participants</h1>
      </div>
      <div className={style.gamefriends__wrapper}>
        {participants.map((participant) => (
          <div className={style.gamefriends__friend}>
            <Avatar alt="Remy Sharp" src={participant.avatar} />
            <h3>{participant.login}</h3>
            <h4>{participant.points}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}
