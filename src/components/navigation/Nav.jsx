import React, { useEffect, useState } from "react";
import "../../index.css";
import { NavLink } from "react-router-dom";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { LuUser, LuSearch, LuHeart } from "react-icons/lu";
import DropDownModel from "./DropDownModel";
import SearchModel from "../search/SearchModel";

export default function Nav() {
  const [dropdownType, setDropdownType] = useState(null);
  const [searchModel, setSearchModel] = useState("close");
  const [sticky, setSticky] = useState(false);

  const handleEnter = (type) => setDropdownType(type);
  const handleLeave = () => setDropdownType(null);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchModel === "close") {
      setSearchModel("open");
    } else {
      setSearchModel("close");
    }
  };

  const handleSticky = () => {
    if (window.scrollY > 0) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleSticky);
    return () => window.removeEventListener("scroll", handleSticky);
  }, []);

  return (
    <header className={sticky ? "sticky" : ""}>
      <nav className="nav-container container">
        <NavLink to="/" className="nav-logo">
          Sliik & Co.
        </NavLink>

        <div className="nav-links">
          <NavLink to="/" className="nav-link">
            Home
          </NavLink>

          <div
            className="nav-item-with-dropdown"
            onMouseEnter={() => handleEnter("shop")}
            onMouseLeave={handleLeave}
          >
            <NavLink
              to="/shop"
              className="nav-link"
              onClick={(e) => {
                if (dropdownType === "shop") e.preventDefault();
              }}
            >
              Shop
            </NavLink>

            {dropdownType === "shop" && (
              <div className="menu-dropdown active">
                <DropDownModel type="shop" />
              </div>
            )}
          </div>

          <div
            className="nav-item-with-dropdown"
            onMouseEnter={() => handleEnter("collection")}
            onMouseLeave={handleLeave}
          >
            <NavLink
              to="/collections"
              className="nav-link"
              onClick={(e) => {
                if (dropdownType === "collections") e.preventDefault();
              }}
            >
              Collections
            </NavLink>

            {dropdownType === "collection" && (
              <div className="menu-dropdown active">
                <DropDownModel type="collection" />
              </div>
            )}
          </div>

          <NavLink to="/about" className="nav-link">
            About
          </NavLink>
          <NavLink to="/contact" className="nav-link">
            Contact
          </NavLink>
        </div>

        <div className="nav-icons">
          <NavLink
            to="/search"
            onClick={(e) => handleSearch(e)}
            className="nav-link"
          >
            <LuSearch />
          </NavLink>
          <NavLink to="/login" className="nav-link">
            <LuUser />
          </NavLink>
          <NavLink to="/whishlist" className="nav-link">
            <LuHeart />
          </NavLink>
          <NavLink to="/cart" className="nav-link">
            <HiOutlineShoppingBag />
          </NavLink>
        </div>
      </nav>
      {searchModel === "open" && <SearchModel />}
    </header>
  );
}
