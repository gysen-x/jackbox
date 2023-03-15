/* eslint-disable react/button-has-type */
import React from 'react';

import './CustomButton.css';

export default function CustomButton({
  id, title, color, type, handleOnClick, className
}) {

  return (
<div className={className}>
{handleOnClick 
? <button
data-id={id}
className="buttonAction"
type={type}
onClick={handleOnClick}
>
<span
  className="button_top"
  style={{
    backgroundColor: color,
  }}
>
  {title}
</span>
</button>
: <button
id={id}
className="buttonAction"
type={type}
>
<span
  className="button_top"
  style={{
    backgroundColor: color,
    
  }}
>
  {title}
</span>
</button>}
</div>
  );
}
