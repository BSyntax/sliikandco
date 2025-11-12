import React, { useState } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import Button from "../controls/Button";

export default function CollectionHeader({ title, showGenderToggle }) {
  const [activeTab, setActiveTab] = useState("men");

  const handleMen = (e) => {
    e.preventDefault();
    setActiveTab("men");
    console.log("Men");
  };

  const handleWomen = (e) => {
    e.preventDefault();
    setActiveTab("women");
    console.log("Women");
  };

  return (
    <section className="section-header container">
      <div className="header-top">
        <h2 className="header-title">{title}</h2>

        {showGenderToggle && (
          <div className="header-controls">
            <div className="toggle-group">
              <NavLink
                to="/men"
                onClick={handleMen}
                className={`toggle-link ${activeTab === "men" ? "active" : ""}`}
              >
                Men
              </NavLink>
              <NavLink
                to="/women" 
                onClick={handleWomen}
                className={`toggle-link ${
                  activeTab === "women" ? "active" : ""
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
