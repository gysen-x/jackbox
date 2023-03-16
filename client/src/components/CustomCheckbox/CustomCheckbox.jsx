import React from 'react';

import './CustomCheckbox.css';

export default function CustomCheckbox({ onChange, checked }) {
  return (
    <label htmlFor="check" className="switch">
      <input
        id="check"
        type="checkbox"
        onChange={onChange}
        checked={checked}
      />
      <span className="slider" />
    </label>
  );
}
