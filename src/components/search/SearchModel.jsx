import React, { useState } from "react";
import { RiCloseLine } from "react-icons/ri";
import PropTypes from "prop-types";

export default function SearchModel({ setSearchModel, visible = true }) {
  if (!visible) return null;
  const [text, setText] = useState("");

  const handleCloseModel = (e) => {
    e.preventDefault();
    setSearchModel((prev) => (prev === "close" ? "open" : "close"));
  };

  const handleText = (e) => setText(e.target.value);

  return visible ? (
    <div className="search-model-form">
      <input
        type="text"
        onChange={handleText}
        value={text}
        placeholder="Search here..."
        onKeyDown={(e) => e.key === "Enter" && handleSearch(e)}
      />
      <button className="search-button" onClick={handleCloseModel}>
        <RiCloseLine />
      </button>
    </div>
  ) : null;
}

handleText.PropTypes = {
  setSearchModel: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
};
