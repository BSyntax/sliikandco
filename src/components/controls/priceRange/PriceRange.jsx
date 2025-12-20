import React from "react";
import * as Slider from "@radix-ui/react-slider";
import PropTypes from "prop-types";

export default function PriceRange({ minLimit, maxLimit, minValue, maxValue, onChange }) {
  const handleSliderChange = ([min, max]) => {
    onChange({ min, max });
  };

  return (
    <div className="sidebar-price-range">
      <span className="sidebar-price-range-header">Price</span>

      {/* Slider */}
      <div className="sidebar-price-range-slider">
        <Slider.Root
          className="slider-root"
          min={minLimit}
          max={maxLimit}
          step={10}
          value={[minValue, maxValue]}
          onValueChange={handleSliderChange}
        >
          <Slider.Track className="slider-track">
            <Slider.Range className="slider-range" />
          </Slider.Track>

          <Slider.Thumb className="slider-thumb" aria-label="Minimum price" />
          <Slider.Thumb className="slider-thumb" aria-label="Maximum price" />
        </Slider.Root>
      </div>

      {/* Number Inputs */}
      <div className="min-max-price">
        <div className="min-max-price-input">
          <label htmlFor="min-price">Min Price</label>
          <input
            type="number"
            id="min-price"
            min={minLimit}
            max={maxValue - 1}
            value={minValue}
            onChange={(e) => {
              const val = Math.min(Number(e.target.value), maxValue - 1);
              onChange({ min: val, max: maxValue });
            }}
          />
        </div>

        <div className="min-max-price-input">
          <label htmlFor="max-price">Max Price</label>
          <input
            type="number"
            id="max-price"
            min={minValue + 1}
            max={maxLimit}
            value={maxValue}
            onChange={(e) => {
              const val = Math.max(Number(e.target.value), minValue + 1);
              onChange({ min: minValue, max: val });
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
