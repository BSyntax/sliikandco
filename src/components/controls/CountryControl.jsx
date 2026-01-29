import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { IoChevronDown } from "react-icons/io5";
import { getAllCountries } from "../../utils/countryConfig";
import "./CountryControl.css";

export default function CountryControl({ value, onChange, error }) {
  const [countries, setCountries] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const list = getAllCountries();
    setCountries(list);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
        setHighlightedIndex(-1);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen) setHighlightedIndex(-1);
  };

  const handleSelect = (code) => {
    onChange(code);
    setIsOpen(false);
    setHighlightedIndex(-1);
  };

  const handleKeyDown = (e) => {
    if (!isOpen) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setIsOpen(true);
      }
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev + 1) % countries.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev <= 0 ? countries.length - 1 : prev - 1
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (highlightedIndex >= 0) handleSelect(countries[highlightedIndex].code);
    } else if (e.key === "Escape") {
      setIsOpen(false);
      setHighlightedIndex(-1);
    }
  };

  const selectedCountry = countries.find((c) => c.code === value);

  return (
    <div className="country-control">
      <div
        className={`filter-select-container ${isOpen ? "filter-active" : ""}`}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        ref={dropdownRef}
        tabIndex={0}
      >
        <div className="filter-select-box">
          <span className="filter-selected">
            {selectedCountry ? selectedCountry.name : "-- Select a country --"}
          </span>
          <IoChevronDown className="filter-select-arrow" />
        </div>

        {isOpen && (
          <ul className="filter-options">
            {countries.map((country, index) => (
              <li
                key={country.code}
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelect(country.code);
                }}
                style={{
                  backgroundColor:
                    highlightedIndex === index ? "#f0f0f0" : "transparent",
                  cursor: "pointer",
                  padding: "4px 8px",
                }}
              >
                {country.name}
              </li>
            ))}
          </ul>
        )}
      </div>
      {error && <span className="error-text">{error}</span>}
    </div>
  );
}

CountryControl.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
};

CountryControl.defaultProps = {
  value: "",
};
