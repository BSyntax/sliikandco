import React, { useState } from "react";
import { LuHeart } from "react-icons/lu";
import { TbHeartFilled } from "react-icons/tb";
import { useWishlist } from "../../context/WishlistProvider";
import PropTypes from "prop-types";
import { useCart } from "../../context/CartProvider";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product, onProductClick }) {
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor] = useState(product.colors[0].name);
  const [image, setImage] = useState(product.image);
  const { addCart } = useCart();
  const navigate = useNavigate();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const isInWishlist = (productId) => {
    return wishlist.some((item) => item.id === productId);
  };
  const isProductInWishlist = isInWishlist(product.id);

  const finalPrice = product.isOnSale
    ? product.price * (1 - (product.discountPercent || 0) / 100)
    : product.price;

  const handleAddToCart = (sizeToAddToCart) => {
    console.log(product.image);
    addCart({
      id: product.id,
      name: product.name,
      price: finalPrice,
      quantity: 1,
      size: sizeToAddToCart,
      sizeType: product.sizeType,
      image: product.image,
      selectedColor: selectedColor,
    });
  };

  const handleImageHover = () => {
    const newImg = product.gallery?.[1];
    if (newImg) setImage(newImg);
  };

  const handleWishlistToggle = (e) => {
    e.stopPropagation(); 
    if (isProductInWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };
  

  return (
    <article className="product-card">
      {product.isOnSale && (
        <span className="sale-badge">{product.discountPercent}% Off</span>
      )}

      <div
        className="product-image"
        onClick={() => {
          onProductClick && onProductClick();
          navigate(`/product/${product.id}`);
        }}
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
        <button className="wishlist-btn" onClick={handleWishlistToggle}>
          {isProductInWishlist ? (
            <TbHeartFilled size={20} />
          ) : (
            <LuHeart size={20} />
          )}
        </button>
      </div>

      <div className="product-info">
        <span className="product-title truncate-text">
          {product.name}
        </span>

        <div className="product-price">
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
        </div>

        {product.sizesAvailable?.length > 0 && (
          <div className="size-group">
            {product.sizesAvailable.map((size) => (
              <button
                key={size}
                type="button"
                className={
                  "size-button" + (selectedSize === size ? " size-active" : "")
                }
                onClick={() => {
                  setSelectedSize(size);
                  handleAddToCart(size);
                }}
              >
                {size}
              </button>
            ))}
          </div>
        )}
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
  onProductClick: PropTypes.func,
};

ProductCard.defaultProps = {
  onProductClick: null,
};
