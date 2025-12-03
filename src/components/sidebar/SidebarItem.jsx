import React, { useState } from "react";
import PropTypes from "prop-types";
import { LuChevronDown } from "react-icons/lu";

export default function SidebarItem({
  label,
  type,
  options,
  onFilterChange,
  selectedFilter,
  colorMap,
  brandCounts,
}) {
  const [isOpen, setIsOpen] = useState(true);

  const selectedValuesForType = (selectedFilter && selectedFilter[type]) || [];

  return (
    <div className={`sidebar-item ${type.toLowerCase()}`}>
      <button
        type="button"
        className="sidebar-header sidebar-header-toggle"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span>{label}</span>
        <span className={`sidebar-chevron ${isOpen ? "open" : ""}`}>
          <LuChevronDown />
        </span>
      </button>

      {isOpen && (
        <ul className={`sidebar-options sidebar-options--${type}`}>
          {options.map((option, index) => {
            const isChecked = selectedValuesForType.includes(option);

            // Brand label with count (by brand & category)
            const labelText =
              type === "brand" && brandCounts
                ? `${option} (${brandCounts[option] || 0})`
                : option;

            // Color swatch style (shape + name)
            if (type === "color") {
              const colorHex =
                (colorMap && colorMap[option]) || "var(--color-gray)";

              return (
                <li
                  key={index}
                  className={`sidebar-option sidebar-option--color ${
                    isChecked ? "selected" : ""
                  }`}
                >
                  <button
                    type="button"
                    className="color-swatch"
                    onClick={() => onFilterChange(type, option)}
                  >
                    <span
                      className="color-swatch-circle"
                      style={{ backgroundColor: colorHex }}
                    />
                    <span className="color-swatch-label">{option}</span>
                  </button>
                </li>
              );
            }

            // Circular size pills
            if (type === "size") {
              return (
                <li
                  key={index}
                  className={`sidebar-option sidebar-option--size ${
                    isChecked ? "selected" : ""
                  }`}
                >
                  <button
                    type="button"
                    className={`size-pill ${isChecked ? "selected" : ""}`}
                    onClick={() => onFilterChange(type, option)}
                  >
                    {option}
                  </button>
                </li>
              );
            }

            // Default checkbox for other filters (category, gender, brand)
            return (
              <li
                key={index}
                className={`sidebar-option ${isChecked ? "selected" : ""}`}
              >
                <label>
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => onFilterChange(type, option)}
                  />
                  <span
                    className={`sidebar-option-label sidebar-option-label--${type}`}
                  >
                    {labelText}
                  </span>
                </label>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

SidebarItem.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onFilterChange: PropTypes.func.isRequired,
  selectedFilter: PropTypes.object,
  colorMap: PropTypes.object,
  brandCounts: PropTypes.object,
};
