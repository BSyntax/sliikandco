import React, { useState } from "react";
import PropTypes from "prop-types";
import { useCart } from "../../context/CartProvider";
import { useNavigate } from "react-router-dom";

export default function ProductCard({
  id,
  name,
  price,
  image,
  sizes = ["S", "M", "L", "XL"],
  sizeType = "Size",
}) {
  const [selectedSize, setSelectedSize] = useState(null);
  const { addCart } = useCart();
  const navigate = useNavigate();

  const handleSizeClick = (size) => {
    setSelectedSize(size);
    addCart({
      id: Date.now() + Math.random(),
      name,
      price,
      quantity: 1,
      size,
      sizeType,
      image,
    });
  };

  return (
    <article className="product-card">
      <div
        className="product-image"
        onClick={() => navigate(`/product/${id}`)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && navigate(`/product/${id}`)}
      >
        <img src={image} alt={name} />
      </div>

      <div className="product-info">
        <span className="product-title">{name}</span>
        <p className="product-price">R{price.toFixed(2)}</p>

        <div className="size-group">
          {sizes.map((size) => (
            <button
              key={size}
              type="button"
              className={
                "size-button" + (selectedSize === size ? " size-active" : "")
              }
              onClick={() => handleSizeClick(size)}
            >
              {size}
            </button>
          ))}
        </div>
      </div>
    </article>
  );
}

ProductCard.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  sizes: PropTypes.arrayOf(PropTypes.string),
  sizeType: PropTypes.string,
};
