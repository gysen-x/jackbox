import React, { useEffect, useRef, useState } from 'react';
import {
  Button, FormControlLabel, MobileStepper, Radio, RadioGroup,
} from '@mui/material';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import CustomButton from '../../components/CustomButton/CustomButton';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomModal from '../../components/CustomModal/CustomModal';
import CustomTooltip from '../../components/CustomTooltip/CustomTooltip';
import './GameSetup.css';
import './SelectGames.css';

import url from '../../url';

export default function GameSetup() {
  const [switchModal, setSwitchModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [allGames, setAllGames] = useState([]);
  const [openTooltipCreateRoom, setTooltipCreateRoom] = useState(false);
  const [formData, setFormData] = useState({ name: '', password: '', gameId: 1 });
  const [activeStep, setActiveStep] = useState(0);
  const [maxSteps, setMaxSteps] = useState(0);
  const inputSlider = useRef();
  const navigate = useNavigate();
  const socketRef = useRef(null);
  const theme = useTheme();
  const [radio, setRadio] = useState(4);

  const changeRadio = (event) => {
    setRadio(event.target.value);
  };

  useEffect(() => {
    const response = fetch(`${url}/games`);
    response
      .then((res) => res.json())
      .then((data) => {
        setAllGames(data);
        setMaxSteps(data.length);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    inputSlider.current.children[activeStep + 1].children[0].checked = true;
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    inputSlider.current.children[activeStep - 1].children[0].checked = true;
  };

  const handleCreateGame = () => {
    if (formData.name.length > 3 && formData.name.length < 11) {
      const { name, password } = formData;
      const token = localStorage.getItem('token');
      const response = fetch(`${url}/rooms`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name, password, gameId: 1, token, maxPlayers: radio,
        }),
      });
      response
        .then((res) => res.json())
        .then((data) => {
          if (data.fail) {
            setAlertMessage('fail');
            setSwitchModal(true);
          } else {
            socketRef.current = io(url);
            socketRef.current.emit('addRoom');
            navigate(`/rooms/${data.id}`);
          }
        })
        .catch((error) => console.log(error));
    } else {
      setTooltipCreateRoom(true);
    }
  };

  const handleOnChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return (
    <div className="contentWrapper newGame">
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
      <div className="gamesWrapper">
        <div className="badgeGame">Tap to card</div>
        <Button size="large" className="buttonColor" onClick={handleBack} disabled={activeStep === 0}>
          {theme.direction === 'rtl' ? (
            <ArrowForwardIosRoundedIcon fontSize="large" />
          ) : (
            <ArrowBackIosRoundedIcon fontSize="large" />
          )}
        </Button>
        <div className="gamesSlider" ref={inputSlider}>
          {allGames.join()
            ? allGames.map(({
              name, rules, description, img, maxPlayers, id,
            }, index) => (
              <div key={`div${id}`}>
                {index === 0
                  ? <input className="inputSlider" defaultChecked="checked" type="radio" name="input-slider" />
                  : <input className="inputSlider" type="radio" name="input-slider" />}
                <div className="gameWrapper">
                  <input id={`radioCheck${id}`} type="checkbox" className="checkCard" />
                  <label htmlFor={`radioCheck${id}`} className="flipCard">
                    <div className="card">
                      <img className="img-card" src={img} alt="game card" />
                      <div className="info-card">
                        <p>{name}</p>
                        <p>{description}</p>
                      </div>
                    </div>
                    <div className="card_back">
                      <p>Rules:</p>
                      <p>{rules}</p>
                      <p>
                        Max players:
                        {' '}
                        {maxPlayers}
                      </p>
                    </div>
                  </label>
                </div>
              </div>
            ))
            : <div>Games not found</div>}
        </div>
        <Button
          className="buttonColor"
          onClick={handleNext}
          disabled={activeStep === maxSteps - 1}
        >
          {theme.direction === 'rtl' ? (
            <ArrowBackIosRoundedIcon
              fontSize="large"
            />
          ) : (
            <ArrowForwardIosRoundedIcon
              fontSize="large"
            />
          )}
        </Button>

      </div>
      <MobileStepper
        sx={{
          position: 'absolute',
          top: '375px',
        }}
        className="dotColor"
        variant="dots"
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
      />
      <CustomInput
        title="Room name"
        className="form-control"
        type="text"
        name="name"
        onChange={handleOnChange}
        placeholder="Room name 4 to 10 chars"
      />
      <div className="radio-wrapper">
        <p>Choose number of players</p>
        <RadioGroup
          row
          aria-label="position"
          name="position"
          defaultValue="4"
          onChange={changeRadio}
          style={{
            gap: '20px',
          }}
        >
          <FormControlLabel
            value="4"
            control={<Radio color="primary" />}
            label="4"
            labelPlacement="start"
          />
          <FormControlLabel
            value="6"
            control={<Radio color="primary" />}
            label="6"
            labelPlacement="start"
          />
          <FormControlLabel
            value="8"
            control={<Radio color="primary" />}
            label="8"
            labelPlacement="start"
          />

        </RadioGroup>
      </div>
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
      <CustomTooltip
        message="Name length must be 4 to 10"
        openTooltip={openTooltipCreateRoom}
        setOpenTooltip={setTooltipCreateRoom}
        inner={(
          <CustomButton
            title="Create"
            color="#fe9e84"
            type="button"
            handleOnClick={handleCreateGame}
          />
)}
      />

      {switchModal
      && <CustomModal setSwitchModal={setSwitchModal} inner={<p>{alertMessage}</p>} />}
    </div>
  );
}
