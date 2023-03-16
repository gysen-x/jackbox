/* eslint-disable no-unused-vars */
import { Avatar } from '@mui/material';
import React, { useState } from 'react';
import style from './style.module.css';
import CustomButton from '../../../../components/CustomButton/CustomButton';

export default function GameFriendsPage({ handleClick }) {
  const [friends, setFriends] = useState([
    { login: 'Oleg', points: 200, avatar: 'https://www.clipartmax.com/png/full/258-2582267_circled-user-male-skin-type-1-2-icon-male-user-icon.png' },
    { login: 'Oleg', points: 200, avatar: 'https://www.clipartmax.com/png/full/258-2582267_circled-user-male-skin-type-1-2-icon-male-user-icon.png' },
    { login: 'Oleg', points: 200, avatar: 'https://www.clipartmax.com/png/full/258-2582267_circled-user-male-skin-type-1-2-icon-male-user-icon.png' },
    { login: 'Oleg', points: 200, avatar: 'https://www.clipartmax.com/png/full/258-2582267_circled-user-male-skin-type-1-2-icon-male-user-icon.png' },
    { login: 'Oleg', points: 200, avatar: 'https://www.clipartmax.com/png/full/258-2582267_circled-user-male-skin-type-1-2-icon-male-user-icon.png' },
    { login: 'Oleg', points: 200, avatar: 'https://www.clipartmax.com/png/full/258-2582267_circled-user-male-skin-type-1-2-icon-male-user-icon.png' },
    { login: 'Oleg', points: 200, avatar: 'https://www.clipartmax.com/png/full/258-2582267_circled-user-male-skin-type-1-2-icon-male-user-icon.png' },
    { login: 'Oleg', points: 200, avatar: 'https://www.clipartmax.com/png/full/258-2582267_circled-user-male-skin-type-1-2-icon-male-user-icon.png' },
  ]);

  // useEffect(() => {

  // }, [])

  return (
    <div>
      <div className={style.gamefriends__title}>
        <CustomButton color="#c41e3a" title="Quit" handleOnClick={handleClick} />
        <h1 className={style.title}>Participants</h1>
      </div>
      <div className={style.gamefriends__wrapper}>
        {friends.map((friend) => (
          <div className={style.gamefriends__friend}>
            <Avatar alt="Remy Sharp" src={friend.avatar} />
            <h3>{friend.login}</h3>
            <h4>{friend.points}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}
