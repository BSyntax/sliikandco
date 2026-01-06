import React, { useState, useRef, useEffect } from "react";
import "./FilterEdit.css";
import { LuSlidersHorizontal } from "react-icons/lu";
import { IoChevronDown } from "react-icons/io5";
import PropTypes from "prop-types";

export default function DateFilter({
  itemCount = 0,
  setSelectedDateFilter,
  initialText = "orders", // e.g., "128 orders"
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("All Time");
  const dropdownRef = useRef(null);

  const dateOptions = [
    "All Time",
    "Past 7 Days",
    "Past 30 Days",
    "Past 3 Months",
    "Past 6 Months",
    "Past Year",
    "2025",
    "2024",
    "2023",
    "Older",
  ];

  const handleToggle = () => setIsOpen(!isOpen);

  const handleSelect = (value) => {
    setSelected(value);
    setSelectedDateFilter(value);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="filter-edit">
      <div className="filter-controls">
        <span className="filter-label">
          Filter <LuSlidersHorizontal />
        </span>

        <div
          className={`filter-select-container ${isOpen ? "filter-active" : ""}`}
          onClick={handleToggle}
          ref={dropdownRef}
          tabIndex={0}
          role="button"
          aria-expanded={isOpen}
          aria-label="Select date range"
        >
          <div className="filter-select-box">
            <span className="filter-selected">{selected}</span>
            <IoChevronDown className="filter-select-arrow" />
          </div>

          {isOpen && (
            <ul className="filter-options">
              {dateOptions.map((opt) => (
                <li
                  key={opt}
                  onClick={() => handleSelect(opt)}
                  className={selected === opt ? "selected" : ""}
                >
                  {opt}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

DateFilter.propTypes = {
  itemCount: PropTypes.number,
  setSelectedDateFilter: PropTypes.func.isRequired,
  initialText: PropTypes.string,
};

DateFilter.defaultProps = {
  itemCount: 0,
  initialText: "orders",
};
