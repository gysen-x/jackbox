/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import './Rooms.css';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import CustomModal from '../../components/CustomModal/CustomModal';

const SERVER_URL = 'http://localhost:3000';

export default function Rooms() {
  const [allRooms, setAllRooms] = useState([]);
  const [filtredRooms, setFiltredRooms] = useState([]);
  const [switchModal, setSwitchModal] = useState(false);
  const [roomId, setRoomId] = useState('');
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
    socketRef.current.on('updateRooms', (rooms) => {
      setAllRooms(rooms);
    });
    socketRef.current.on('checkEnterToRoom', ({ id }) => {
      const refreshRooms = allRooms.map((room) => (room.id === id ? ({
        id: room.id,
        name: room.name,
        isPassword: room.isPassword,
        members: room.members + 1,
        gameName: room.gameName,
        maxPlayers: room.maxPlayers,
      }
      ) : room));
      console.log(allRooms);
      setAllRooms(refreshRooms);
    });
  }, []);

  useEffect(() => {
    socketRef.current.on('checkEnterToRoom', ({ id }) => {
      const refreshRooms = allRooms.map((room) => (room.id === Number(id) ? ({
        ...room,
        members: room.members + 1,
      })
        : room));
      console.log(refreshRooms);
      setAllRooms(refreshRooms);
    });
  }, [allRooms]);

  const handleClick = (event) => {
    const { id } = event.currentTarget.dataset;
    const token = localStorage.getItem('token');
    socketRef.current.emit('enterToRoom', { id, token });
    navigate(`/rooms/${id}`);
  };

  const handleFindChange = (event) => {
    const finded = allRooms
      .filter((el) => el.name
        .toLowerCase()
        .includes(event.target.value.trim().toLowerCase()));
    setFiltredRooms(finded);
  };

  const handlePrivate = (event) => {
    const currentRoomId = event.currentTarget.dataset.id;
    setSwitchModal(true);
    setRoomId(Number(currentRoomId));
  };

  const handleCheckPass = (event) => {
    event.preventDefault();
    // fetch('/rooms/checkpass', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({id: roomId, password: formData}), //id room
    // })
    alert(`id: ${roomId}, password: ${formData}`);
  };

  const handleCheckForm = (event) => {
    setFormData(event.target.value);
  };

  return (
    <div className="contentWrapper">
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
      <br />
      <ol className="olList">
        <li className="liItem">
          <span>#</span>
          <span>Room name</span>
          <span>Game name</span>
          <span>Members</span>
          <span style={{ width: '80px' }} />
        </li>
        {filtredRooms.join()
          ? filtredRooms.map(({
            id, name, members, gameName, maxPlayers, isPassword,
          }, index) => (
            <li key={id} className="liItem">
              <span>{index + 1}</span>
              <span>{name}</span>
              <span>{gameName}</span>
              <span>{`${members}/${maxPlayers}`}</span>
              <CustomButton
                id={id}
                title={isPassword ? 'Join🔒' : 'Join'}
                color="#fe9e84"
                type="button"
                handleOnClick={isPassword ? handlePrivate : handleClick}
              />
            </li>
          ))
          : allRooms.join() && allRooms.map(({
            id, name, members, gameName, maxPlayers, isPassword,
          }, index) => (
            <li key={id} className="liItem">
              <span>{index + 1}</span>
              <span>{name}</span>
              <span>{gameName}</span>
              <span>{`${members}/${maxPlayers}`}</span>
              <CustomButton
                id={id}
                title={isPassword ? 'Join🔒' : 'Join'}
                color="#fe9e84"
                type="button"
                handleOnClick={isPassword ? handlePrivate : handleClick}
              />
            </li>
          ))}
      </ol>
      <br />
      <CustomButton
        id="checkButton"
        title="Back"
        color="#fe9e84"
        type="submit"
        handleOnClick={() => navigate('/choose')}
      />
      <img className="logoMini" src="/images/Logo.png" alt="logo" />
      {switchModal
                && (
                <CustomModal
                  setSwitchModal={setSwitchModal}
                  inner={(
                    <form onSubmit={handleCheckPass} className="formCheckPass">
                      <CustomInput
                        title="Room password"
                        className="form-control"
                        id="checkPass"
                        type="text"
                        name="password"
                        onChange={handleCheckForm}
                        placeholder="Enter room password..."
                      />
                      <div style={{ height: '20px' }} />
                      <CustomButton
                        id="checkButton"
                        title="Submit"
                        color="#fe9e84"
                        type="submit"
                      />
                    </form>
                        )}
                />
                )}
    </div>
  );
}
