import React from "react";
import { NavLink } from "react-router-dom";
import { LuChevronRight } from "react-icons/lu";

export default function BreadCrumb({ from = "Home", current }) {
  return (
    <div className="breadcrumb-container">
      <div className="breadcrumb-content container">
        <nav aria-label="breadcrumb" className="breadcrumb">
          <NavLink to="/">{from}</NavLink>
          <span className="separator" aria-hidden="true">
            /
          </span>
          <span className="current" aria-current="page">
            {current}
          </span>
        </nav>
      </div>
    </div>
  );
}
