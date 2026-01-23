import React, { useState } from "react";
import "./SearchModel.css";
import { RiCloseLine } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import ProductGrid from "../productGrid/ProductGrid";

export default function SearchModel({ setSearchModel, visible = true }) {
  if (!visible) return null;
  const [text, setText] = useState("");

  const handleClose = () => {
    setSearchModel("close");
  };

  const handleSearch = (e) => {
    setText(e.target.value);
  };

  return (
    <div className={`search-model-form ${text ? "search-model--active" : ""}`}>
      <div className="search-controls">
        <input
          type="text"
          onChange={handleSearch}
          value={text}
          placeholder="Search here..."
          autoFocus
        />
        <button className="search-button" onClick={handleClose}>
          <RiCloseLine />
        </button>
      </div>

      {text && (
        <div className="view-searched">
          <NavLink
            to={`/search?query=${encodeURIComponent(text)}`}
            className="close-search"
            onClick={handleClose}
          >
            View all results for "{text}"
          </NavLink>
        </div>
      )}

      <ProductGrid searchText={text} onProductClick={handleClose} />
    </div>
  );
}
