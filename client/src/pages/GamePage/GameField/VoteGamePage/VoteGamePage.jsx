import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CustomButton from '../../../../components/CustomButton/CustomButton';

import style from './style.module.css';

export default function VoteGamePage({ voteData, socketRef }) {
  const { id: roomId } = useParams();
  const [nextVote, setNextVote] = useState(false);
  const user = useSelector((state) => state.user);
  const [waitingStatus, setWaitingStatus] = useState(false);

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on('waitingOtherVotes', ({ id, userId }) => {
        if (id === roomId && user.userid === userId) {
          setWaitingStatus(true);
        }
      });
    }
  }, []);

  const handleVoteClick = (id) => {
    const token = localStorage.getItem('token');
    socketRef.current.emit('currentParticipantVote', { token, roomId, id });
    // setNextVote(true);
    // setTimeout(() => {
    setNextVote(false);
    // }, 500);
  };

  return (
    <div className={style.voteGamePage__container}>

      {waitingStatus && (
      <p>Waiting</p>
      )}
      {!waitingStatus && (
      <>
        <h2 className={style.voteGamePage__title}>Vote</h2>
        {!nextVote ? (
          <>
            <h2 className={style.voteGamePage__setup}>
              {voteData.setup}
            </h2>
            <div className={style.voteGamePage__wrapper}>
              <div className={style.voteGamePage__box}>
                <div className={style.voteGamePage__punchBox}>
                  <h4 className={style.voteGamePage__punch}>{voteData.first.punch}</h4>
                </div>
                <CustomButton
                  title="Vote"
                  color="rgb(254, 158, 132)"
                  handleOnClick={() => handleVoteClick(voteData.first.id)}
                />
              </div>
              <div className={style.voteGamePage__box}>
                <div className={style.voteGamePage__punchBox}>
                  <h4 className={style.voteGamePage__punch}>{voteData.second.punch}</h4>
                </div>
                <CustomButton
                  title="Vote"
                  color="rgb(254, 158, 132)"
                  handleOnClick={() => handleVoteClick(voteData.second.id)}
                />
              </div>
            </div>
          </>
        ) : (
          <p>loader</p>
        )}
      </>
      )}
    </div>

  );
}
