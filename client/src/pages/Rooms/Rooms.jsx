/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import './Rooms.css';

const SERVER_URL = 'http://localhost:3000';

export default function Rooms() {
  const [allRooms, setAllRooms] = useState([]);
  const navigate = useNavigate();
  const socketRef = useRef(null);

  useEffect(() => {
    const response = fetch('/rooms');
    response
      .then((res) => res.json())
      .then((data) => {
        setAllRooms(data);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    socketRef.current = io(SERVER_URL);
    socketRef.current.emit('connection');
    console.log('socket useEffect');
    socketRef.current.on('updateRooms', (rooms) => {
      console.log('rooms from Rooms: ', rooms);

      setAllRooms(rooms)
    })
  }, []);

  const handleClick = (event) => {
    navigate(`/rooms/${event.target.dataset.buttonid}`);
  };

  return (
    <div className="roomsWrapper">
      <h1 className="homepageH1">SELECT ROOMS</h1>
      <ol className="olList">
        {allRooms.join() && allRooms.map(({
          id, name, members, gameName, maxPlayers,
        }, index) => (
          <li key={id} className="liItem">
            <span>{index + 1}</span>
            <span>{name}</span>
            <span>{gameName}</span>
            <span>{`${members}/${maxPlayers}`}</span>
            <button onClick={handleClick} data-buttonid={id} className="buttonAction" type="button">
              <span className="button_top button_play">
                Play
              </span>
            </button>
          </li>
        ))}
      </ol>
      <img className="logoMini" src="/images/b536a8d6.svg" alt="logo" />
    </div>
  );
}
