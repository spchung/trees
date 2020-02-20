import React from 'react';
import styled from 'styled-components';

const SliderHeader = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const StyledSlider = styled.div`
  position: relative;
  border-radius: 3px;
  background: #dddddd;
  height: 15px;
`;

const StyledThumb = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 3px;
  position: relative;
  top: -3px;
  opacity: 0.5;
  background: #33ff99;
  cursor: pointer;
`;

// SORECE : https://www.robinwieruch.de/react-slider 

const getPercentage = (current, max) => (100 * current) / max;

const getValue = (percentage, max) => (max / 100) * percentage;

const getLeft = (percentage) => `calc(${percentage}% - 5px)`;

const Slider = ({
  initial,
  max,
  onChange,
}) => {

  const initialPercentage = getPercentage(initial, max);

  const sliderRef = React.useRef();
  const thumbRef = React.useRef();
  const currentRef = React.useRef();

  const diff = React.useRef(null);

  const handleMouseMove = event => {
    let newX =
      event.clientX -
      diff.current -
      sliderRef.current.getBoundingClientRect().left;

    const end =
      sliderRef.current.offsetWidth - thumbRef.current.offsetWidth;

    const start = 0;

    if (newX < start) {
      newX = 0;
    }

    if (newX > end) {
      newX = end;
    }

    const newPercentage = getPercentage(newX, end);
    const newValue = getValue(newPercentage, max);

    thumbRef.current.style.left = getLeft(Math.round(newPercentage));
    currentRef.current.textContent = Math.round(newValue);

    onChange(newValue);
  };

  const handleMouseUp = () => {
    document.removeEventListener('mouseup', handleMouseUp);
    document.removeEventListener('mousemove', handleMouseMove);
  };

  const handleMouseDown = event => {
    diff.current =
      event.clientX - thumbRef.current.getBoundingClientRect().left;

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <>
      <SliderHeader>
        <strong ref={currentRef}>{initial}</strong>
        &nbsp;/&nbsp;
        {max}
      </SliderHeader>
      <StyledSlider ref={sliderRef}>
        <StyledThumb
          style={{ left: getLeft(initialPercentage) }}
          ref={thumbRef}
          onMouseDown={handleMouseDown}
        />
      </StyledSlider>
    </>
  );
};

export default Slider;