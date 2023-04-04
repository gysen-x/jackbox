/* eslint-disable react/button-has-type */
import React from 'react';

import './CustomButton.css';

export default function CustomButton({
  id,
  title,
  color,
  type,
  handleOnClick,
  className,
  width,
  height,
  fontSize,
  disabled,
}) {
  // const [sizeWidthHeight, setSizeWidthHeight] = useState(['100px', 'auto']);

  // useEffect(() => {
  //   if (size) {
  //     setSizeWidthHeight([size[0], size[1]]);
  //   }
  // }, []);

  return (
    <div className={className}>
      {handleOnClick
        ? (disabled ? (
          <button
            data-id={id}
            className="buttonAction"
            disabled
            type={type}
            onClick={handleOnClick}
            style={{
              width,
              height,
            }}
          >
            <span
              className="button_top"
              style={{
                backgroundColor: color,
                fontSize,
              }}
            >
              {title}
            </span>
          </button>
        ) : (
          <button
            data-id={id}
            className="buttonAction"
            type={type}
            onClick={handleOnClick}
            style={{
              width,
              height,
            }}
          >
            <span
              className="button_top"
              style={{
                backgroundColor: color,
                fontSize,
              }}
            >
              {title}
            </span>
          </button>
        )

        )
        : (
          disabled ? (
            <button
              disabled
              id={id}
              className="buttonAction"
              type={type}
              style={{
                width,
                height,
              }}
            >
              <span
                fontSize={fontSize}
                className="button_top"
                style={{
                  backgroundColor: color,
                  fontSize,
                }}
              >
                {title}
              </span>
            </button>
          ) : (
            <button
              id={id}
              className="buttonAction"
              type={type}
              style={{
                width,
                height,
              }}
            >
              <span
                fontSize={fontSize}
                className="button_top"
                style={{
                  backgroundColor: color,
                  fontSize,
                }}
              >
                {title}
              </span>
            </button>
          )
        )}
    </div>
  );
}
