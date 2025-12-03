import React, { useState, useRef, useEffect } from "react";
import { LuSlidersHorizontal } from "react-icons/lu";
import { IoChevronDown } from "react-icons/io5";
import PropTypes from "prop-types";

export default function FilterEdit({
  itemCount = 0,
  setSelectedSort,
  initialText,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("Sort By");
  const dropdownRef = useRef(null);

  const options = [
    "Popularity",
    "Newest",
    "Price: Low to High",
    "Price: High to Low",
  ];

  const handleToggle = () => setIsOpen(!isOpen);

  const handleSelect = (value) => {
    setSelected(value);
    setSelectedSort(value);
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
    <div className="filter-edit container">
      <div className="item-count">{itemCount} {initialText}</div>

      <div className="filter-controls">
        <span className="filter-label">
          Filter <LuSlidersHorizontal />
        </span>

        <div
          className={`filter-select-container ${isOpen ? "filter-active" : ""}`}
          onClick={handleToggle}
          ref={dropdownRef}
          tabIndex={1}
        >
          <div className="filter-select-box">
            <span className="filter-selected">{selected}</span>
            <IoChevronDown className="filter-select-arrow" />
          </div>

          <ul className="filter-options">
            {options.map((opt) => (
              <li key={opt} onClick={() => handleSelect(opt)}>
                {opt}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

FilterEdit.propTypes = {
  itemCount: PropTypes.number.isRequired,
  setSelectedSort: PropTypes.func.isRequired,
  initialText: PropTypes.string.isRequired,
};