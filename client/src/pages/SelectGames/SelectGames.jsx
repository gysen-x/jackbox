/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SelectGames.css';

// для карточки id инпута и htmlFor лейбла должны совпадать, но быть уникальными для каждой карточки

export default function SelectGames() {
  const navigate = useNavigate();
  const [allGames, setAllGames] = useState([]);

  useEffect(() => {
    const response = fetch('http://localhost:3000/games');
    response
      .then((res) => res.json())
      .then((data) => {
        console.log(data); setAllGames(data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="selectGamesWrapper">
      <h1 className="homepageH1">SELECT GAME</h1>
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

              <button onClick={() => navigate(`/games/${id}/options`)} className="buttonAction" type="button">
                <span className="button_top button_play">
                  Play
                </span>
              </button>
            </div>
          ))
          : <div>Games not found</div>}
      </div>
      <p>Tap to card</p>
      <img className="logoMini" src="/images/b536a8d6.svg" alt="logo" />
    </div>
  );
}
