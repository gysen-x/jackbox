import React from 'react';
import './Choose.css';

export default function Choose() {
  return (
    <div className="homepageWrapper">
      <hi className="homepageH1">GAME</hi>
      <button className="buttonAction" type="button">
        <span className="button_top button_login">
          Enter
        </span>
      </button>
      <button className="buttonAction" type="button">
        <span className="button_top button_play">
          Create
        </span>
      </button>
      <img className="logoMini" src="/images/b536a8d6.svg" alt="logo" />
    </div>
  );
}
