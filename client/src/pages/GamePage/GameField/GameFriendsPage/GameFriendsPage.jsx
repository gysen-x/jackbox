import { Avatar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import style from './style.module.css'

export default function GameFriendsPage() {

  const [friends, setFriends] = useState([
    {login: 'Oleg', points: 200, avatar:'https://www.clipartmax.com/png/full/258-2582267_circled-user-male-skin-type-1-2-icon-male-user-icon.png'},
    {login: 'Oleg', points: 200, avatar:'https://www.clipartmax.com/png/full/258-2582267_circled-user-male-skin-type-1-2-icon-male-user-icon.png'},
    {login: 'Oleg', points: 200, avatar:'https://www.clipartmax.com/png/full/258-2582267_circled-user-male-skin-type-1-2-icon-male-user-icon.png'},
    {login: 'Oleg', points: 200, avatar:'https://www.clipartmax.com/png/full/258-2582267_circled-user-male-skin-type-1-2-icon-male-user-icon.png'},
    {login: 'Oleg', points: 200, avatar:'https://www.clipartmax.com/png/full/258-2582267_circled-user-male-skin-type-1-2-icon-male-user-icon.png'},
    {login: 'Oleg', points: 200, avatar:'https://www.clipartmax.com/png/full/258-2582267_circled-user-male-skin-type-1-2-icon-male-user-icon.png'},
    {login: 'Oleg', points: 200, avatar:'https://www.clipartmax.com/png/full/258-2582267_circled-user-male-skin-type-1-2-icon-male-user-icon.png'},
    {login: 'Oleg', points: 200, avatar:'https://www.clipartmax.com/png/full/258-2582267_circled-user-male-skin-type-1-2-icon-male-user-icon.png'},
  ])

  // useEffect(() => {

  // }, [])



  return (
    <div>
      <h1 className={style.gamefriends__title}>Participants</h1>
      <div className={style.gamefriends__wrapper}>
          {friends.map(friend => (
            <div className={style.gamefriends__friend}> 
            <Avatar alt="Remy Sharp" src={friend.avatar} />
            <h3>{friend.login}</h3>
            <h4>{friend.points}</h4>
            </div>
          ))}
      </div>
    </div>
  )
}
