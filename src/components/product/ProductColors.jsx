import React from "react";

export default function ProductColors({ product, handleColorSelect }) {
  return (
    <div className="product-colors">
      {product.colors && product.colors.length > 0 ? (
        <ul className="color-list">
          {product.colors.map((color, index) => (
            <li
              key={index}
              style={{ backgroundColor: color.hex }}
              onClick={() => handleColorSelect(color.name)}
            ></li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
