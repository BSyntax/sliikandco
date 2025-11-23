import Button from "../controls/Button";
import { LuHeart } from "react-icons/lu";
import { TbHeartFilled } from "react-icons/tb";
import PropTypes from "prop-types";

export default function ProductActions({
  onAddToCart,
  isWishlisted,
  onBuy,
  onToggleWishlist,
  product,
  quantity,
  onQuantityIncrease,
  onQuantityDecrease,
}) {
  return (
    <div className="product-actions">
      <div className="product-cart-actions">
        {/* <div className="quantity-controls">
          <button
            className="quantity-btn"
            onClick={onQuantityDecrease}
            aria-label={`Decrease quantity of ${product.name}`}
            type="button"
          >
            -
          </button>

          <div className="quantity-input">
            <input
              type="number"
              value={quantity}
              readOnly
              aria-label={`Quantity: ${quantity}`}
            />
          </div>

          <button
            className="quantity-btn"
            onClick={onQuantityIncrease}
            aria-label={`Increase quantity of ${product.name}`}
            type="button"
          >
            +
          </button>
        </div> */}
        <Button text="Add to Cart" variant="primary" onClick={onAddToCart} />
      </div>
      <div className="wishlist-control">
        <button className="wishlist-btn" onClick={onToggleWishlist}>
          {isWishlisted ? <TbHeartFilled size={20} /> : <LuHeart size={20} />}
        </button>
        <span className="wishlist-text">Add to wishlist</span>
      </div>
    </div>
  );
}

ProductActions.propTypes = {
  onAddToCart: PropTypes.func.isRequired,
  isWishlisted: PropTypes.bool.isRequired,
  onBuy: PropTypes.func.isRequired,
};
