import React from 'react';

import './CustomCheckbox.css';

export default function CustomCheckbox({ onChange }) {
  return (
    <label htmlFor="check" className="switch">
      <input
        id="check"
        type="checkbox"
        onChange={onChange}
      />
      <span className="slider" />
    </label>
  );
}
