/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import './Rooms.css';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';

const SERVER_URL = 'http://localhost:3000';

export default function Rooms() {
  const [allRooms, setAllRooms] = useState([]);
  const [filtredRooms, setFiltredRooms] = useState([]);
  const [switchModal, setSwitchModal] = useState(false);
  const [formData, setFormData] = useState('');
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

  const handleFindChange = (event) => {
    const finded = allRooms
    .filter((el) => el.name
    .toLowerCase()
    .includes(event.target.value.trim().toLowerCase()));
    setFiltredRooms(finded);
  };

  const handlePrivate = (event) => {
    setSwitchModal((prev) => !prev);
  }

  const handleCheckPass = () => {
    fetch('/rooms/checkpass', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({id, password: formData}), //id room
    })
  }

  const handleCheckForm = (event) => {
    setFormData(event.target.value);
  }

  return (
    <div className="roomsWrapper">
      <h1 className="homepageH1">SELECT ROOMS</h1>
      <CustomInput
            title="Find game"
            className="form-control"
            id="findInput"
            type="text"
            name="roomName"
            onChange={handleFindChange}
            placeholder="Enter room name..."
          />
          <br/>
      <ol className="olList">
        <li className="liItem">
        <span>#</span>
            <span>Room name</span>
            <span>Game name</span>
            <span>Members</span>
            <span style={{width: '80px'}} />
        </li>
        {filtredRooms.join() 
          ? filtredRooms.map(({
            id, name, members, gameName, maxPlayers, isPassword
          }, index) => (
            <li key={id} className="liItem">
              <span>{index + 1}</span>
              <span>{name}</span>
              <span>{gameName}</span>
              <span>{`${members}/${maxPlayers}`}</span>
              <button onClick={ isPassword ? handlePrivate : handleClick } data-buttonid={id} className="buttonAction" type="button">
              <span className="button_top button_play">
              {isPassword ?  'Join🔒' : 'Join' }
              </span>
            </button>
            </li>
          ))
        : allRooms.join() && allRooms.map(({
          id, name, members, gameName, maxPlayers, isPassword
        }, index) => (
          <li key={id} className="liItem">
            <span>{index + 1}</span>
            <span>{name}</span>
            <span>{gameName}</span>
            <span>{`${members}/${maxPlayers}`}</span>
            <button onClick={ isPassword ? handlePrivate : handleClick } data-buttonid={id} className="buttonAction" type="button">
              <span className="button_top button_play">
              {isPassword ?  'Join🔒' : 'Join' }
              </span>
            </button>
          </li>
        ))}
      </ol>
      <br />
      <button onClick={() => navigate('/choose')} className="buttonAction" type="button">
              <span className="button_top button_play">
                Back
              </span>
            </button>
      <img className="logoMini" src="/images/b536a8d6.svg" alt="logo" />
      {switchModal && 
        <div className='modal'>
        <form onSubmit={handleCheckPass} className='modalWindow'>
          <CustomInput
            title="Room password"
            className="form-control"
            id="checkPass"
            type="text"
            name="password"
            onChange={handleCheckForm}
            placeholder="Enter room password..."
          />
          <CustomButton 
            id="checkButton"
            title="Submit"
            color="#fe9e84"
            type="submit"/>
        </form>
      </div>}
    </div>
  );
}
