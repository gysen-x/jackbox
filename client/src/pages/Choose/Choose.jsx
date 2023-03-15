import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Choose.css';

export default function Choose() {
  const navigate = useNavigate();

  return (
    <div className="homepageWrapper">
      <h1 className="homepageH1">GAME</h1>
      <button onClick={() => navigate('/rooms')} className="buttonAction" type="button">
        <span className="button_top button_login">
          Enter
        </span>
      </button>
      <button onClick={() => navigate('/games')} className="buttonAction" type="button">
        <span className="button_top button_play">
          Create
        </span>
      </button>
      <img className="logoMini" src="/images/b536a8d6.svg" alt="logo" />
    </div>
  );
}
