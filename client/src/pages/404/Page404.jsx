import React from 'react';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../../components/CustomButton/CustomButton';

export default function Page404() {
  const navigate = useNavigate();

  return (
    <div className="contentWrapper">
      <h1 className="homepageH1">Page not found</h1>
      <CustomButton
        title="Back"
        color="#fe9e84"
        type="button"
        handleOnClick={() => navigate('/')}
      />
      <img className="logoMini" src="/images/Logo.png" alt="logo" />
    </div>
  );
}
