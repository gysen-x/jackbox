/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import './CustomModal.css';

// const [switchModal, setSwitchModal] = useState(false);
// вписать в компонент где нужно модальное окно

export default function CustomModal({children, setSwitchModal}) {

  const handleSwitchModal = (event) => {
    if (event.target.className === 'modal') setSwitchModal(false);
  };

   return (
   <div onPointerDown={handleSwitchModal} className='modal'>
      {children}
  </div>
  );
}
