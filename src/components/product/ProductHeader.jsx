import React from "react";

import { RiStarFill } from "react-icons/ri";

export default function ProductHeader({ product, rating, selectedColor }) {
  const productName = product.name.split("-").slice(0, -1).join("-");
  return (
    <div className="product-header">
      <h2 className="product-title">
        {productName} - {selectedColor}
      </h2>
      <div className="product-rating">
        <RiStarFill size={16} color="393e41" />
        <span className="no-rating">{rating}/5</span>
      </div>
    </div>
  );
}
