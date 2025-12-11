import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { IoChevronDown } from "react-icons/io5";

export default function CountryControl({ value, onChange }) {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,cca2"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch countries");
        }

        const data = await response.json();

        const countryOptions = data
          .map((country) => ({
            code: country.cca2,
            name: country.name.common,
          }))
          .sort((a, b) => a.name.localeCompare(b.name));

        setCountries(countryOptions);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching countries:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
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

  const handleSelect = (countryCode) => {
    onChange(countryCode);
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
      if (highlightedIndex >= 0) {
        handleSelect(countries[highlightedIndex].code);
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
      setHighlightedIndex(-1);
    }
  };

  if (loading) {
    return <div className="country-control">Loading countries...</div>;
  }

  if (error) {
    return <div className="country-control error">Error: {error}</div>;
  }

  const selectedCountry = countries.find((c) => c.code === value);

  return (
    <div className="country-control">
      <div
        id="country-select"
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
    </div>
  );
}

CountryControl.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

CountryControl.defaultProps = {
  value: "",
};
