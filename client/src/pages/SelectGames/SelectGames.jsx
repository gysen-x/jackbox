/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SelectGames.css';

// для карточки id инпута и htmlFor лейбла должны совпадать, но быть уникальными для каждой карточки

export default function SelectGames() {
  const navigate = useNavigate();

  return (
    <div className="selectGamesWrapper">
      <hi className="homepageH1">SELECT GAME</hi>
      <div className="gamesWrapper">
        <div className="gameWrapper">
          <input id="radioCheck" type="checkbox" className="checkCard" />
          <label htmlFor="radioCheck" className="flipCard">
            <div className="card">
              <img className="img-card" src="/images/meme.jpg" alt="game card" />
              <div className="info-card">
                <p>Рифмы и панчи</p>
                <p>Ситуация и панчи к ней</p>
              </div>
            </div>
            <div className="card_back">
              <p>Правила игры:</p>
              <p>1. Дается ситуация</p>
              <p>2. Игроки придумывают панчлайн</p>
              <p>Побеждает самый смешной</p>
            </div>
          </label>

          <button onClick={() => navigate('/games/1/options')} className="buttonAction" type="button">
            <span className="button_top button_play">
              Play
            </span>
          </button>
        </div>
        <div className="gameWrapper">
          <input id="radioCheck_1" type="checkbox" className="checkCard" />
          <label htmlFor="radioCheck_1" className="flipCard">
            <div className="card">
              <img className="img-card" src="/images/durak.jpg" alt="game card" />
              <div className="info-card">
                <p>Дурак</p>
                <p>Подкидной переводной</p>
              </div>
            </div>
            <div className="card_back">
              <p>Правила игры:</p>
              <p>1. Раздается 6 карт</p>
              <p>2. Проездной работает</p>
              <p>Избавься от всех карт</p>
            </div>
          </label>

          <button className="buttonAction" type="button">
            <span className="button_top button_play">
              Play
            </span>
          </button>
        </div>
        <div className="gameWrapper">
          <input id="radioCheck_2" type="checkbox" className="checkCard" />
          <label htmlFor="radioCheck_2" className="flipCard">
            <div className="card">
              <img className="img-card" src="/images/drawit.jpeg" alt="game card" />
              <div className="info-card">
                <p>Draw it!</p>
                <p>Рисуй! Угадывай!</p>
              </div>
            </div>
            <div className="card_back">
              <p>Правила игры:</p>
              <p>1. Один рисует</p>
              <p>2. Остальные угадывают</p>
              <p>Побеждает, тот кто быстрее угадает</p>
            </div>
          </label>

          <button className="buttonAction" type="button">
            <span className="button_top button_play">
              Play
            </span>
          </button>
        </div>
      </div>
      <p>Tap to card</p>
      <img className="logoMini" src="/images/b536a8d6.svg" alt="logo" />
    </div>
  );
}
