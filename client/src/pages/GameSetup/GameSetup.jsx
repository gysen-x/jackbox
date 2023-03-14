import React from 'react';
import './GameSetup.css';

export default function GameSetup() {
  return (
    <div className="homepageWrapper">
      <hi className="homepageH1">OPTIONS</hi>
      <div className="switchWrapper">
        <p>Private</p>
        <label htmlFor="private" className="switch">
          <input
            id="private"
            type="checkbox"
          />
          <span className="slider" />
        </label>
      </div>
      <div className="input-wrapper">
        <input type="text" placeholder="Password" name="password" className="input" />
      </div>
      <div className="input-wrapper">
        <input type="text" placeholder="Room name" name="roomName" className="input" />
      </div>
      <button className="buttonAction" type="button">
        <span className="button_top button_play">
          Create
        </span>
      </button>
      <img className="logoMini" src="/images/b536a8d6.svg" alt="logo" />
    </div>
  );
}
