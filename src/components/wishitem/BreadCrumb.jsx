import React from "react";
import { NavLink } from "react-router-dom";
import { LuChevronRight } from "react-icons/lu";

export default function BreadCrumb({ from, current }) {
  const label = typeof from === "string" ? from : from.label;
  const path = typeof from === "string" ? "/" : from.path;

  return (
    <div className="breadcrumb-container">
      <div className="breadcrumb-content container">
        <nav aria-label="breadcrumb" className="breadcrumb">
          <ul className="breadcrumb-list">
            <li className="breadcrumb-item">
              <NavLink to={path} className="breadcrumb-link">
                {label}
              </NavLink>
            </li>
            <span className="separator" aria-hidden="true">
              /
            </span>
            <li className="breadcrumb-item current" aria-current="page">
              {current}
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
