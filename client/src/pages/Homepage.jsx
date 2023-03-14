import React from 'react';
import './Homepage.css';

export default function Homepage() {
  return (
    <div className="homepageWrapper">
      <hi className="homepageH1">GAME BOX</hi>
      <button className="buttonAction" type="button">
        <span className="button_top button_login">
          Login
        </span>
      </button>
      <button className="buttonAction" type="button">
        <span className="button_top button_play">
          Play
        </span>
      </button>
      <img className="logoMini" src="/images/b536a8d6.svg" alt="logo" />
    </div>
  );
}
