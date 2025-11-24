import React, { useState, useRef, useEffect } from "react";
import { IoChevronDown } from "react-icons/io5";

export default function ReviewSort({ sortValue, onSortChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const reviewSortOptions = [
    { value: "recent", label: "Most Recent" },
    { value: "oldest", label: "Oldest" },
    { value: "high-rated", label: "Highest Rated" },
    { value: "low-rated", label: "Lowest Rated" },
  ];

  const selectedLabel =
    reviewSortOptions.find((opt) => opt.value === sortValue)?.label ||
    "Sort Reviews";

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (value) => {
    onSortChange(value);
    setIsOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="review-sort">
      <div
        className={`filter-select-container ${isOpen ? "filter-active" : ""}`}
        ref={dropdownRef}
        onClick={toggleDropdown}
        tabIndex={0}
      >
        <div className="filter-select-box">
          <span className="filter-selected">{selectedLabel}</span>
          <span className="filter-select-arrow">
            <IoChevronDown />
          </span>
        </div>

        <ul className="filter-options">
          {reviewSortOptions.map((opt) => (
            <li key={opt.value} onClick={() => handleSelect(opt.value)}>
              {opt.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
