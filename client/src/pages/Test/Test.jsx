import { Box } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import SelectGames from './SelectGames';
import GameSetup from './GameSetup';
import CustomTable from '../../components/CustomTable/CustomTable';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomModal from '../../components/CustomModal/CustomModal';
import CustomButton from '../../components/CustomButton/CustomButton';

const SERVER_URL = 'http://localhost:3000';

export default function Test() {
  const [allRooms, setAllRooms] = useState([]);
  const [filtredRooms, setFiltredRooms] = useState([]);
  const [switchModal, setSwitchModal] = useState(false);
  const [roomsArray, setRoomsArray] = useState([]);
  const [roomId, setRoomId] = useState('');
  const [formData, setFormData] = useState('');
  const navigate = useNavigate();
  const socketRef = useRef(null);

  //
  useEffect(() => {
    if (filtredRooms.join()) {
      setRoomsArray(filtredRooms);
    } else {
      setRoomsArray(allRooms);
    }
  }, [filtredRooms]);
  // get array of rooms from database
  useEffect(() => {
    const response = fetch('/rooms');
    response
      .then((res) => res.json())
      .then((data) => {
        setAllRooms(data);
      })
      .catch((error) => console.log(error));
  }, []);

  // get room from another user by socket.io
  useEffect(() => {
    socketRef.current = io(SERVER_URL);
    socketRef.current.emit('connection');
    socketRef.current.on('updateRooms', (rooms) => {
      setAllRooms(rooms);
    });
  }, []);

  // get data about members in rooms
  useEffect(() => {
    socketRef.current.on('checkEnterToRoom', ({ id }) => {
      const refreshRooms = allRooms.map((room) => (room.id === Number(id) ? ({
        ...room,
        members: room.members + 1,
      })
        : room));
      setAllRooms(refreshRooms);
    });
  }, [allRooms]);

  // redirect user to actual room
  const handleClick = (event) => {
    const { id } = event.currentTarget.dataset;
    const token = localStorage.getItem('token');
    socketRef.current.emit('enterToRoom', { id, token });
    navigate(`/rooms/${id}`);
  };

  // search room by name
  const handleFindChange = (event) => {
    const finded = allRooms
      .filter((el) => el.name
        .toLowerCase()
        .includes(event.target.value.trim().toLowerCase()));
    setFiltredRooms(finded);
  };

  // modal window private room logic
  const handlePrivate = (event) => {
    const currentRoomId = event.currentTarget.dataset.id;
    setSwitchModal(true);
    setRoomId(Number(currentRoomId));
  };

  // checking password to enter the room
  const handleCheckPass = (event) => {
    event.preventDefault();
    // fetch('/rooms/checkpass', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({id: roomId, password: formData}), //id room
    // })
    alert(`id: ${roomId}, password: ${formData}`);
  };

  // getting password from modal window
  const handleCheckForm = (event) => {
    setFormData(event.target.value);
  };

  return (
    <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gridAutoRows="140px" gap="20px">
      <Box gridColumn="span 6">
        <h1>Table title</h1>
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
        <CustomTable
          roomsArray={roomsArray}
          handlePrivate={handlePrivate}
          handleClick={handleClick}
        />
      </Box>
      <Box gridColumn="span 4">
        <GameSetup />
        <SelectGames />
      </Box>
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
    </Box>
  );
}
