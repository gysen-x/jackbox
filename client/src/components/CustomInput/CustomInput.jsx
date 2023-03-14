/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import './CustomInput.css';

export default function CustomInput({
  title, type, name, value, onChange, placeholder,
}) {
  return (
    <label className="input-wrapper">
      <p id="usernameText">{title}</p>
      <input
        className="input"
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </label>
  );
}
