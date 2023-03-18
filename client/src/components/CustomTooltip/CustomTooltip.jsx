/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { styled } from '@mui/material/styles';
import { Zoom } from '@mui/material';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

const StyledTooltip = styled(({ className, ...props }) => (
  <Tooltip
    {...props}
    placement="right"
    disableInteractive
    leaveDelay={500}
    TransitionComponent={Zoom}
    classes={{ popper: className }}
  />
))(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: 'rgb(196, 30, 58)',
    color: 'azure',
    maxWidth: 180,
    minHeight: 40,
    fontSize: 17,
    border: '3px solid #333',
    padding: 5,
    borderRadius: '0.75em',
    zIndex: 1000,
    textTransform: 'upperCase',
  },
}));

export default function CustomTooltip({
  openTooltip, setOpenTooltip, message, inner,
}) {
  const handleTooltipClose = () => {
    setOpenTooltip(false);
  };

  return (
    <StyledTooltip
      onClose={handleTooltipClose}
      open={openTooltip}
      title={(
        <p color="inherit">{message || 'some error'}</p>
        )}
    >
      <span>
        {inner}
      </span>
    </StyledTooltip>
  );
}
