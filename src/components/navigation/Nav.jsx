import React, { useState } from "react";
import "../../index.css";
import { NavLink } from "react-router-dom";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { LuUser, LuSearch, LuHeart } from "react-icons/lu";

export default function Nav() {
  return (
    <header>
      <nav className="nav-container container">
        <NavLink to="/" className="nav-logo">
          Sliik & Co.
        </NavLink>
        <div className="nav-links">
          <NavLink to="/" className="nav-link">
            Home
          </NavLink>
          <NavLink to="/shop" className="nav-link">
            Shop
          </NavLink>
          <NavLink to="/collection" className="nav-link">
            Collection
          </NavLink>
          <NavLink to="/about" className="nav-link">
            About
          </NavLink>
          <NavLink to="/contact" className="nav-link">
            Contact
          </NavLink>
        </div>

        <div className="nav-icons">
          <NavLink to="/login" className="nav-link">
            <LuSearch />
          </NavLink>
          <NavLink to="/login" className="nav-link">
            <LuUser />
          </NavLink>
          <NavLink to="/shoppinglist" className="nav-link">
            <LuHeart />
          </NavLink>
          <NavLink to="/cart" className="nav-link">
            <HiOutlineShoppingBag />
          </NavLink>
        </div>
      </nav>
    </header>
  );
}
