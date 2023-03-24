/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-vars */
import { Avatar, Badge } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import style from './style.module.css';
import url from '../../../../url';

export default function GameParticipantsPage({ socketRef, status }) {
  const ourUser = useSelector((store) => store.user);
  const [participants, setParticipants] = useState([]);
  const [ourFriends, setOurFriends] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    (async () => {
      const tokenJWT = localStorage.getItem('token');
      const response = await fetch(
        `${url}/users`,
        {
          headers: {
            Authentication: `Bearer ${tokenJWT}`,
          },
        },
      );
      const result = await response.json();
      const { friends } = result;
      const friendsIds = friends.map((el) => el.id);
      setOurFriends(friendsIds);
    })();

    fetch(`${url}/rooms/${id}/participants`)
      .then((res) => res.json())
      .then((data) => setParticipants(data.sort((a, b) => a.id - b.id)))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on('checkEnterToRoom', ({ id: roomId, user }) => {
        if (Number(id) === Number(roomId)) {
          const orderParticipants = [...participants, user].sort((a, b) => a.id - b.id);
          setParticipants(orderParticipants);
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
          setParticipants(refreshParticipants.sort((a, b) => a.id - b.id));
        }
      });

      socketRef.current.on('gameFinished', ({ roomId }) => {
        if (id === roomId) {
          const participantsWithoutPoints = participants.map((el) => ({ ...el, points: 0 }));
          setParticipants(participantsWithoutPoints);
        }
      });
    }
  }, [participants]);

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on('checkAddFriend', ({ ourId, friendId }) => {
        if (ourUser.userid === ourId || ourUser.userid === friendId) {
          if (ourUser.userid === ourId) {
            setOurFriends([...ourFriends, friendId]);
          } else {
            setOurFriends([...ourFriends, ourId]);
          }
        }
      });
    }
  }, [ourFriends]);

  const addFriendShip = (friendId) => {
    const token = localStorage.getItem('token');
    socketRef.current.emit('addFriend', { friendId, token });
  };

  return (
    <div>
      <div className={style.gamefriends__title}>
        <h1 className={style.title}>Participants</h1>
      </div>
      <div className={style.gamefriends__wrapper}>
        {participants.map((participant) => (
          <div key={participant.id} className={style.gamefriends__friend}>
            {participant.ready ? (
              <Badge className={style.badgeStatus} badgeContent="✓" color="success">
                <Avatar alt="Remy Sharp" src={participant.avatar} />
              </Badge>
            ) : (
              status === 'finished' && !ourFriends.includes(participant.id) && ourUser.userid !== participant.id
                ? (
                  <Badge
                    className={style.badgeAddFriend}
                    badgeContent="+"
                    color="info"
                    onClick={() => { addFriendShip(participant.id); }}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                    }}
                  >
                    <Avatar alt="Remy Sharp" src={participant.avatar} />
                  </Badge>
                )
                : (<Avatar alt="Remy Sharp" src={participant.avatar} />)
            )}
            <h3 className={style.participantlogin}>{participant.login}</h3>
            <h4>{participant.pointsInGame}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}
