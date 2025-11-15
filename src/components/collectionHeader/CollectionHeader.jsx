import React, { useState } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import Button from "../controls/Button";

export default function CollectionHeader({
  title,
  showGenderToggle,
  selectedGender,
  onGenderChange,
}) {
  return (
    <section className="section-header container">
      <div className="header-top">
        <h2 className="header-title">{title}</h2>

        {showGenderToggle && (
          <div className="header-controls">
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
              onClick={() => {}}
              variant="secondary"
              type="button"
            />
          </div>
        )}
      </div>
    </section>
  );
}

CollectionHeader.propTypes = {
  title: PropTypes.string.isRequired,
  showGenderToggle: PropTypes.bool,
};
