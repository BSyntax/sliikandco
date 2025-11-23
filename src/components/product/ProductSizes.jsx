import React from "react";

export default function ProductSizes({ product, selectedSize, onSelectSize }) {
  return (
    <div className="size-group">
      {product.sizesAvailable.map((size) => (
        <button
          key={size}
          type="button"
          className={`size-button${
            selectedSize === size ? " size-active" : ""
          }`}
          style={
            selectedSize === size
              ? {
                  background: "#101419",
                  color: "#ffffff",
                  border: "none",
                }
              : {}
          }
          onClick={() => onSelectSize(size)}
        >
          {size}
        </button>
      ))}
    </div>
  );
}
