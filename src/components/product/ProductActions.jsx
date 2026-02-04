import Button from "../controls/Button";
import { LuHeart } from "react-icons/lu";
import { TbHeartFilled } from "react-icons/tb";
import PropTypes from "prop-types";

export default function ProductActions({
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
  isLoading,
}) {
  return (
    <div className="product-actions">
      <div className="product-cart-actions">
        <Button
          text="Add to Cart"
          variant="primary"
          onClick={onAddToCart}
          isLoading={isLoading}
          className="add-to-cart-btn"
        />
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
  isLoading: PropTypes.bool,
};
