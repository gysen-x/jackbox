import React, { useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import io from 'socket.io-client';
import './GameSetup.css';

const SERVER_URL = 'http://localhost:3000';

export default function GameSetup() {
  const [switchButton, setSwitchButton] = useState(false);
  const [formData, setFormData] = useState({ name: '', password: '' });
  const { id: gameId } = useParams();
  const navigate = useNavigate();
  const socketRef = useRef(null);






  const handleSwitch = () => {
    setSwitchButton((prev) => !prev);
    if (switchButton) setFormData({ name: formData.name, password: '' });
  };

  const handleCreateGame = () => {
    if (formData.name.length > 3 && formData.name.length < 11) {
      const { name, password } = formData;
      const response = fetch('/rooms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, password, gameId }),
      });
      response
        .then((res) => res.json())
        .then((data) => {
          if (data.fail) {
            alert('fail');
          } else {
            socketRef.current = io(SERVER_URL);
            socketRef.current.emit('addRoom')
            navigate('/rooms');
          }
        })
        .catch((error) => console.log(error));
    } else alert('name length min 4 and max 10');
  };

  const handleOnChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return (
    <div className="homepageWrapper">
      <h1 className="homepageH1">OPTIONS</h1>
      <div className="switchWrapper">
        <p>Private</p>
        <label htmlFor="private" className="switch">
          <input
            onChange={handleSwitch}
            id="private"
            type="checkbox"
          />
          <span className="slider" />
        </label>
      </div>
      {switchButton && (
      <div className="input-wrapper">
        <input onChange={handleOnChange} type="text" placeholder="Password" name="password" className="input" />
      </div>
      )}
      <div className="input-wrapper">
        <input onChange={handleOnChange} type="text" placeholder="Room name" name="name" className="input" />
      </div>
      <button onClick={handleCreateGame} className="buttonAction" type="button">
        <span className="button_top button_play">
          Create
        </span>
      </button>
      <img className="logoMini" src="/images/b536a8d6.svg" alt="logo" />
    </div>
  );
}
