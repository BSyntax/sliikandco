import React from "react";
import PropTypes from "prop-types";

export default function PriceRange({
  minLimit,
  maxLimit,
  minValue,
  maxValue,
  onChange,
}) {
  return (
    <div className="sidebar-price-range">
      <span className="sidebar-price-range-header">Price</span>
      <div className="sidebar-price-range-slider">
        <input
          type="range"
          min={minLimit}
          max={maxLimit}
          value={minValue}
          onChange={(e) => {
            const newMin = Math.min(Number(e.target.value), maxValue);
            onChange({ min: newMin, max: maxValue });
          }}
          className="sidebar-price-slider sidebar-price-slider--min"
        />
        <input
          type="range"
          min={minLimit}
          max={maxLimit}
          value={maxValue}
          onChange={(e) => {
            const newMax = Math.max(Number(e.target.value), minValue);
            onChange({ min: minValue, max: newMax });
          }}
          className="sidebar-price-slider sidebar-price-slider--max"
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
              const val = Number(e.target.value) || minLimit;
              const clamped = Math.min(Math.max(val, minLimit), maxValue);
              onChange({ min: clamped, max: maxValue });
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
              const val = Number(e.target.value) || maxLimit;
              const clamped = Math.max(Math.min(val, maxLimit), minValue);
              onChange({ min: minValue, max: clamped });
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
