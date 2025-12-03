import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";

export default function PriceRange({
  minLimit,
  maxLimit,
  minValue,
  maxValue,
  onChange,
}) {
  const progressRef = useRef(null);

  // Update the progress bar position
  useEffect(() => {
    const range = maxLimit - minLimit;
    const minPercent = ((minValue - minLimit) / range) * 100;
    const maxPercent = ((maxValue - minLimit) / range) * 100;

    if (progressRef.current) {
      progressRef.current.style.left = `${minPercent}%`;
      progressRef.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minValue, maxValue, minLimit, maxLimit]);

  // Min slider moved
  const handleMinChange = (e) => {
    const val = Number(e.target.value);
    if (val < maxValue) {
      onChange({ min: val, max: maxValue });
    } else {
      onChange({ min: maxValue - 1, max: maxValue });
    }
  };

  // Max slider moved
  const handleMaxChange = (e) => {
    const val = Number(e.target.value);
    if (val > minValue) {
      onChange({ min: minValue, max: val });
    } else {
      onChange({ min: minValue, max: minValue + 1 });
    }
  };

  return (
    <div className="sidebar-price-range">
      <span className="sidebar-price-range-header">Price</span>

      <div className="sidebar-price-range-slider">
        <div ref={progressRef} className="slider-progress" />

        <input
          type="range"
          min={minLimit}
          max={maxLimit}
          value={minValue}
          onChange={handleMinChange}
          className="sidebar-price-slider slider-min"
        />

        <input
          type="range"
          min={minLimit}
          max={maxLimit}
          value={maxValue}
          onChange={handleMaxChange}
          className="sidebar-price-slider slider-max"
        />
      </div>

      <div className="min-max-price">
        <div className="min-max-price-input">
          <label htmlFor="min-price">Min Price</label>
          <input
            type="number"
            id="min-price"
            min={minLimit}
            max={maxLimit}
            value={minValue}
            onChange={(e) => {
              const val = Number(e.target.value);
              onChange({
                min: Math.min(val, maxValue - 1),
                max: maxValue,
              });
            }}
          />
        </div>

        <div className="min-max-price-input">
          <label htmlFor="max-price">Max Price</label>
          <input
            type="number"
            id="max-price"
            min={minLimit}
            max={maxLimit}
            value={maxValue}
            onChange={(e) => {
              const val = Number(e.target.value);
              onChange({
                min: minValue,
                max: Math.max(val, minValue + 1),
              });
            }}
          />
        </div>
      </div>
    </div>
  );
}

PriceRange.propTypes = {
  minLimit: PropTypes.number.isRequired,
  maxLimit: PropTypes.number.isRequired,
  minValue: PropTypes.number.isRequired,
  maxValue: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};
