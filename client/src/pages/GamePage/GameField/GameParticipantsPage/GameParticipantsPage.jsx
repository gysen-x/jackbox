/* eslint-disable no-unused-vars */
import { Avatar, Badge } from '@mui/material';
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
        if (Number(id) === Number(roomId)) {
          setParticipants([...participants, user]);
        }
      });

      socketRef.current.on('playerQuitRoom', ({ id: roomId, userId }) => {
        if (id === roomId) {
          const filtredParticipants = participants.filter(
            (participant) => participant.id !== userId,
          );
          setParticipants(filtredParticipants);
        }
      });

      socketRef.current.on('playerReady', ({ roomId, userId }) => {
        if (id === roomId) {
          const readyParticipants = participants.map((participant) => {
            if (participant.id === userId) {
              return {
                ...participant,
                ready: true,
              };
            }
            return participant;
          });
          setParticipants(readyParticipants);
        }
      });

      socketRef.current.on('everybodyReady', ({ roomId }) => {
        if (id === roomId) {
          const participantsWOReadyCheck = participants.map((el) => ({ ...el, ready: false }));
          setParticipants(participantsWOReadyCheck);
        }
      });

      socketRef.current.on('everybodyVote', ({ roomId, refreshParticipants }) => {
        if (id === roomId) {
          setParticipants(refreshParticipants);
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
          <div key={participant.id} className={style.gamefriends__friend}>
            {participant.ready ? (
              <Badge badgeContent="✓" color="primary">
                <Avatar alt="Remy Sharp" src={participant.avatar} />
              </Badge>
            ) : (
              <Avatar alt="Remy Sharp" src={participant.avatar} />
            )}
            <h3>{participant.login}</h3>
            <h4>{participant.pointsInGame}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}
