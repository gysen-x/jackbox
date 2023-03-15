import React, { useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import io from 'socket.io-client';
import CustomButton from '../../components/CustomButton/CustomButton';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomModal from '../../components/CustomModal/CustomModal';
import './GameSetup.css';

const SERVER_URL = 'http://localhost:3000';

export default function GameSetup() {
  const [switchButton, setSwitchButton] = useState(false);
  const [switchModal, setSwitchModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
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
            setAlertMessage('fail')
            setSwitchModal(true);
          } else {
            socketRef.current = io(SERVER_URL);
            socketRef.current.emit('addRoom')
            navigate('/rooms');
          }
        })
        .catch((error) => console.log(error));
    } else {
    setAlertMessage('name length min 4 and max 10');
    setSwitchModal(true);
  }
  };

  const handleOnChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return (
    <div className="contentWrapper">
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
      <CustomInput
      title="Room name"
      className="form-control"
      type="text"
      name="name"
      onChange={handleOnChange}
      placeholder="Room name"
    />
      {switchButton && (
      <CustomInput
      title="Password"
      className="form-control"
      type="text"
      name="password"
      onChange={handleOnChange}
      placeholder="Password"
    />
      )}
      <CustomButton
          title='Create'
          color="#fe9e84"
          type="button"
          handleOnClick={handleCreateGame}/>
      <CustomButton
          title='Back'
          color="#fe9e84"
          type="button"
          handleOnClick={() => navigate('/games')}/>
      <img className="logoMini" src="/images/b536a8d6.svg" alt="logo" />
      {switchModal && 
      <CustomModal setSwitchModal={setSwitchModal} children={<p>{alertMessage}</p>}/>
     }
    </div>
  );
}
