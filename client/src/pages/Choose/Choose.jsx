import React from 'react';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../../components/CustomButton/CustomButton';
import './Choose.css';

export default function Choose() {
  const navigate = useNavigate();

  return (
    <div className="contentWrapper">
      <h1 className="homepageH1">GAME</h1>
      <CustomButton
        title="Enter"
        color="#fe9e84"
        type="button"
        handleOnClick={() => navigate('/rooms')}
      />
      <CustomButton
        title="Create"
        color="#fe9e84"
        type="button"
        handleOnClick={() => navigate('/games')}
      />
      <img className="logoMini" src="/images/Logo.png" alt="logo" />
    </div>
  );
}
