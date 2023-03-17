import React, { useEffect, useRef, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import io from 'socket.io-client';
import CustomButton from '../../components/CustomButton/CustomButton';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomModal from '../../components/CustomModal/CustomModal';
import './GameSetup.css';
import './SelectGames.css';

export default function GameSetup() {
  // const [switchButton, setSwitchButton] = useState(false);
  const [switchModal, setSwitchModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [allGames, setAllGames] = useState([]);
  const [formData, setFormData] = useState({ name: '', password: '' });
  // const { id: gameId } = useParams();
  // const navigate = useNavigate();
  const socketRef = useRef(null);

  // const handleSwitch = () => {
  //   setSwitchButton((prev) => !prev);
  //   if (switchButton) setFormData({ name: formData.name, password: '' });
  // };

  useEffect(() => {
    const response = fetch('/games');
    response
      .then((res) => res.json())
      .then((data) => {
        console.log(data); setAllGames(data);
      })
      .catch((error) => console.log(error));
  }, []);

  // const handleCreateGame = () => {
  //   if (formData.name.length > 3 && formData.name.length < 11) {
  //     const { name, password } = formData;
  //     const response = fetch('/rooms', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ name, password, gameId: 1 }),
  //     });
  //     response
  //       .then((res) => res.json())
  //       .then((data) => {
  //         if (data.fail) {
  //           setAlertMessage('fail');
  //           setSwitchModal(true);
  //         } else {
  //           // socketRef.current = io(SERVER_URL);
  //           socketRef.current.emit('addRoom');
  //           // navigate('/rooms');
  //         }
  //       })
  //       .catch((error) => console.log(error));
  //   } else {
  //     setAlertMessage('name length min 4 and max 10');
  //     setSwitchModal(true);
  //   }
  // };

  const handleCreateGame = () => {
    if (formData.name.length > 3 && formData.name.length < 11) {
      const { name, password } = formData;
      const token = localStorage.getItem('token');
      const response = fetch('/rooms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name, password, gameId: 1, token,
        }),
      });
      response
        .then((res) => res.json())
        .then((data) => {
          if (data.fail) {
            setAlertMessage('fail');
            setSwitchModal(true);
          } else {
            // socketRef.current = io(SERVER_URL);
            socketRef.current.emit('addRoom');
            // navigate(`/rooms/${data.id}`);
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
      <h1 className="homepageH1">CREATE GAME</h1>
      {/* <div className="switchWrapper">
        <p>Private</p>
        <label htmlFor="private" className="switch">
          <input
            onChange={handleSwitch}
            id="private"
            type="checkbox"
          />
          <span className="slider" />
        </label>
      </div> */}
      <p>Tap to card</p>
      <div className="gamesWrapper">
        {allGames.join()
          ? allGames.map(({
            name, rules, description, img, maxPlayers, id,
          }) => (
            <div key={`div${id}`} className="gameWrapper">
              <input id="radioCheck" type="checkbox" className="checkCard" />
              <label htmlFor="radioCheck" className="flipCard">
                <div className="card">
                  <img className="img-card" src={img} alt="game card" />
                  <div className="info-card">
                    <p>{name}</p>
                    <p>{description}</p>
                  </div>
                </div>
                <div className="card_back">
                  <p>Правила игры:</p>
                  <p>{rules}</p>
                  <p>
                    Max players:
                    {' '}
                    {maxPlayers}
                  </p>
                </div>
              </label>
            </div>
          ))
          : <div>Games not found</div>}
      </div>
      <CustomInput
        title="Room name"
        className="form-control"
        type="text"
        name="name"
        onChange={handleOnChange}
        placeholder="Room name 4 to 10 chars"
      />
      {/* {switchButton && ( */}
      <CustomInput
        title="Password"
        className="form-control"
        type="text"
        name="password"
        onChange={handleOnChange}
        placeholder="Password if you want"
      />
      {/* )} */}
      <CustomButton
        title="Create"
        color="#fe9e84"
        type="button"
        handleOnClick={handleCreateGame}
      />
      {switchModal
      && <CustomModal setSwitchModal={setSwitchModal} inner={<p>{alertMessage}</p>} />}
    </div>
  );
}
