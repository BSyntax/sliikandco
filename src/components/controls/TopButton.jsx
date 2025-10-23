import React, { useState, useEffect } from "react";
import { LuChevronUp } from "react-icons/lu";

export default function TopButton() {
  const [showTop, setShowTop] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setShowTop(true);
    } else {
      setShowTop(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      className={`top-button ${showTop ? "show" : ""}`}
      onClick={handleScrollToTop}
    >
      <span>
        {" "}
        <LuChevronUp />
      </span>
    </button>
  );
}
