import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { LuChevronRight } from "react-icons/lu";
import "./Sidebar.css";
import PropTypes from "prop-types";

const titles = {
  "personal-info": "Personal Information",
  addresses: "Addresses",
  "order-history": "Order History",
  wishlist: "Wishlist",
};

export default function Sidebar({ setMainTitle }) {
  const [activeLink, setActiveLink] = useState("personal-info");
  const handleLinkClick = (link) => {
    setActiveLink(link);
    setMainTitle(titles[link] || "Profile");
  };
  return (
    <div className="sidebar">
      <ul>
        <li
          className={activeLink === "personal-info" ? "active" : ""}
          onClick={() => handleLinkClick("personal-info")}
        >
          <NavLink to="/profile/personal-info">Personal Information</NavLink>
          <LuChevronRight size={20} />
        </li>
        <li
          className={activeLink === "addresses" ? "active" : ""}
          onClick={() => handleLinkClick("addresses")}
        >
          <NavLink to="/profile/addresses">Addresses</NavLink>
        </li>
        <li
          className={activeLink === "order-history" ? "active" : ""}
          onClick={() => handleLinkClick("order-history")}
        >
          <NavLink to="/profile/order-history">Order History</NavLink>
          <LuChevronRight size={20} />
        </li>
        <li
          className={activeLink === "wishlist" ? "active" : ""}
          onClick={() => handleLinkClick("wishlist")}
        >
          <NavLink to="/profile/wishlist">Wishlist</NavLink>
          <LuChevronRight size={20} />
        </li>
      </ul>
    </div>
  );
}

Sidebar.propTypes = {
  setMainTitle: PropTypes.func,
};

Sidebar.defaultProps = {
  setMainTitle: () => {},
};
