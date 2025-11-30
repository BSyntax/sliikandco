import React from "react";
import PropTypes from "prop-types";

export default function SidebarItem({
  label,
  type,
  options,
  onFilterChange,
  selectedFilter,
}) {
  return (
    <div className={`sidebar-item ${type.toLowerCase()}`}>
      <span className="sidebar-header">{label}</span>
      <ul className="sidebar-options">
        {options.map((option, index) => (
          <li
            key={index}
            className={`sidebar-option ${
              selectedFilter &&
              selectedFilter.type === type &&
              selectedFilter.value === option
                ? "selected"
                : ""
            }`}
            onClick={() => onFilterChange(type, option)}
          >
            {type !== "size" && type !== "color" ? (
              <label htmlFor={`${type}-${option}`}>
                <input
                  type="checkbox"
                  name={type}
                  id={`${type}-${option}`}
                  checked={
                    selectedFilter &&
                    selectedFilter.type === type &&
                    selectedFilter.value === option
                  }
                  readOnly
                />
                {option}
              </label>
            ) : (
              option
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
