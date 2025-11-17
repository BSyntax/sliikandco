import React, { useState } from "react";
import PropTypes from "prop-types";
import { useCart } from "../../context/CartProvider";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product }) {
  const [selectedSize, setSelectedSize] = useState(null);
  const [image, setImage] = useState(product.image);
  const { addCart } = useCart();
  const navigate = useNavigate();

  const finalPrice = product.isOnSale
    ? product.price * (1 - (product.discountPercent || 0) / 100)
    : product.price;

  const handleAddToCart = () => {
    if (!selectedSize && product.sizesAvailable?.length > 0) {
      alert("Please select a size first.");
      return;
    }
    addCart({
      id: product.id,
      name: product.name,
      price: finalPrice,
      quantity: 1,
      size: selectedSize,
      sizeType: product.sizeType,
      image: product.image,
    });
  };

  const handleImageHover = () => {
    const newImg = product.gallery?.[1];
    if (newImg) setImage(newImg);
  };

  return (
    <article className="product-card">
      {product.isOnSale && (
        <span className="sale-badge">{product.discountPercent}% Off</span>
      )}

      <div
        className="product-image"
        onClick={() => navigate(`/product/${product.id}`)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) =>
          e.key === "Enter" && navigate(`/product/${product.id}`)
        }
      >
        <img
          src={image}
          onMouseEnter={handleImageHover}
          onMouseLeave={() => setImage(product.image)}
          alt={product.name}
        />
      </div>

      <div className="product-info">
        <span className="product-title">{product.name}</span>

        <p className="product-price">
          {product.isOnSale ? (
            <div className="price-on-sale">
              <span className="original-price">
                {`R${product.price.toFixed(2)}`}
              </span>
              --
              <span>{`R${finalPrice.toFixed(2)}`}</span>
            </div>
          ) : (
            `R${finalPrice.toFixed(2)}`
          )}
        </p>

        {product.sizesAvailable?.length > 0 && (
          <div className="size-group">
            {product.sizesAvailable.map((size) => (
              <button
                key={size}
                type="button"
                className={
                  "size-button" + (selectedSize === size ? " size-active" : "")
                }
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
        )}

        <button className="add-to-cart-btn" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </article>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    gallery: PropTypes.arrayOf(PropTypes.string),
    sizesAvailable: PropTypes.arrayOf(PropTypes.string),
    sizeType: PropTypes.string,
    isOnSale: PropTypes.bool,
    discountPercent: PropTypes.number,
  }).isRequired,
};
