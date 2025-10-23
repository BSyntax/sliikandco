import React, { useState } from "react";
import { LuSearch } from "react-icons/lu";
import { useNavigate } from "react-router";
import { RiCloseLine } from "react-icons/ri";

export default function SearchModel({ visible = true }) {
  if (!visible) return null;
  const [text, setText] = useState("");
  const navigate = useNavigate();

  const handleText = (e) => setText(e.target.value);

  const handleSearch = (e) => {
    e.preventDefault();
    if (text.trim() !== "") {
      navigate(`/search/${text}`);
    }
  };

  return visible ? (
    <div className="search-model-form">
      <input
        type="text"
        onChange={handleText}
        value={text}
        placeholder="Search here..."
        onKeyDown={(e) => e.key === "Enter" && handleSearch(e)}
      />
      {text && (
        <button className="clear-icon" onClick={() => setText("")}>
          <RiCloseLine />
        </button>
      )}
      <button className="search-button" onClick={handleSearch}>
        <LuSearch />
      </button>
    </div>
  ) : null;
}
