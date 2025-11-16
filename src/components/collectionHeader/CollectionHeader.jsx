import React, { useState } from "react";
import PropTypes from "prop-types";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "../controls/Button";

export default function CollectionHeader({
  title,
  showGenderToggle,
  selectedGender,
  onGenderChange,
}) {
  const navigate = useNavigate();
  return (
    <section className="section-header container">
      <div
        className={`${
          showGenderToggle ? "header-top" : "header-top no-toggle"
        }`}
      >
        <h2 className="header-title">{title}</h2>

        {showGenderToggle && title === "New Arrivals" && (
          <div
            className={`header-actions ${
              title === "New Arrivals" ? "with-toggle" : ""
            }`}
          >
            <div className="toggle-group">
              <NavLink
                to="/men"
                onClick={(e) => {
                  e.preventDefault();
                  onGenderChange("Men");
                }}
                className={`toggle-link ${
                  selectedGender === "Men" ? "active" : ""
                }`}
              >
                Men
              </NavLink>
              <NavLink
                to="/women"
                onClick={(e) => {
                  e.preventDefault();
                  onGenderChange("Women");
                }}
                className={`toggle-link ${
                  selectedGender === "Women" ? "active" : ""
                }`}
              >
                Women
              </NavLink>
            </div>

            <Button
              text="View All"
              onClick={() => {
                navigate("/shop");
              }}
              variant="secondary"
              type="button"
              className="collection-button"
            />
          </div>
        )}

        {title === "Best Sellers" && showGenderToggle === false && (
          <Button
            text="View All"
            onClick={() => {
              navigate("/shop");
            }}
            variant="secondary"
            type="button"
            className="collection-button"
          />
        )}
      </div>
    </section>
  );
}

CollectionHeader.propTypes = {
  title: PropTypes.string.isRequired,
  showGenderToggle: PropTypes.bool,
  selectedGender: PropTypes.string,
  onGenderChange: PropTypes.func,
};
