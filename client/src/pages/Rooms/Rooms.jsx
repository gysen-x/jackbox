/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import './Rooms.css';

// для карточки id инпута и htmlFor лейбла должны совпадать, но быть уникальными для каждой карточки

export default function Rooms() {
  return (
    <div className="roomsWrapper">
      <hi className="homepageH1">SELECT ROOMS</hi>
      <ol className="olList">
        <li className="liItem">
          <span>1</span>
          <span>RIP</span>
          <span>2/8</span>
          <button className="buttonAction" type="button">
            <span className="button_top button_play">
              Play
            </span>
          </button>
        </li>
        <li className="liItem">
          <span>2</span>
          <span>DURAK</span>
          <span>8/8</span>
          <button className="buttonAction" type="button">
            <span className="button_top button_play">
              Play
            </span>
          </button>
        </li>
        <li className="liItem">
          <span>3</span>
          <span>DRAW IT</span>
          <span>6/8</span>
          <button className="buttonAction" type="button">
            <span className="button_top button_play">
              Play
            </span>
          </button>
        </li>
      </ol>
      <img className="logoMini" src="/images/b536a8d6.svg" alt="logo" />
    </div>
  );
}
