/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Rooms.css';

export default function Rooms() {
  const [allRooms, setAllRooms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const response = fetch('/rooms');
    response
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setAllRooms(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleClick = (event) => {
    navigate(`/rooms/${event.target.dataset.buttonid}`);
  };

  return (
    <div className="roomsWrapper">
      <h1 className="homepageH1">SELECT ROOMS</h1>
      <ol className="olList">
        {allRooms.join() && allRooms.map(({
          id, name, members, gameName, maxPlayers,
        }, index) => (
          <li key={id} className="liItem">
            <span>{index + 1}</span>
            <span>{name}</span>
            <span>{gameName}</span>
            <span>{`${members}/${maxPlayers}`}</span>
            <button onClick={handleClick} data-buttonid={id} className="buttonAction" type="button">
              <span className="button_top button_play">
                Play
              </span>
            </button>
          </li>
        ))}
        {/* <li className="liItem">
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
        </li> */}
      </ol>
      <img className="logoMini" src="/images/b536a8d6.svg" alt="logo" />
    </div>
  );
}
