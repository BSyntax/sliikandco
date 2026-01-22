import React, { memo } from "react";
import "./CartItem.css";
import PropTypes from "prop-types";
import Button from "../controls/Button";
import { Link } from "react-router-dom";
import { encryptId } from "../../utils/idUtils";

const CartItem = memo(({ item, onQuantityChange, onDelete, onCloseCart }) => {
  const handleDecrease = () => {
    if (item.quantity > 1) {
      onQuantityChange(item.id, item.quantity - 1);
    }
  };

  const handleIncrease = () => {
    onQuantityChange(item.id, item.quantity + 1);
  };

  const handleRemove = () => onDelete(item.id);

  return (
    <div className="cart-item">
      <div className="item-image">
        <img src={item.image} alt={item.name} />
      </div>

      <div className="item-center">
        <Link
          to={`/product/${encryptId(item.id)}`}
          className="item-name"
          onClick={onCloseCart}
        >
          {item.name}
        </Link>
        <p className="item-size">
          {item.sizeType}: {item.size}
        </p>

        <div className="quantity-controls">
          <button
            className="quantity-btn"
            onClick={handleDecrease}
            aria-label={`Decrease quantity of ${item.name}`}
            type="button"
          >
            -
          </button>

          <div className="quantity-input">
            <input
              type="number"
              value={item.quantity}
              readOnly
              aria-label={`Quantity: ${item.quantity}`}
            />
          </div>

          <button
            className="quantity-btn"
            onClick={handleIncrease}
            aria-label={`Increase quantity of ${item.name}`}
            type="button"
          >
            +
          </button>
        </div>
      </div>

      <div className="item-right">
        <div className="item-price">R{item.price.toFixed(2)}</div>

        <Button
          text="Remove"
          onClick={handleRemove}
          variant="secondary"
          className="delete-btn"
          style ={{backgroundColor:"transparent"}}
        />
      </div>
    </div>
  );
});

CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    size: PropTypes.string.isRequired,
    sizeType: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  onQuantityChange: PropTypes.func,
  onDelete: PropTypes.func.isRequired,
};

CartItem.defaultProps = {
  onQuantityChange: () => console.warn("onQuantityChange not provided"),
  onDelete: () => console.warn("onDelete not provided"),
};

export default CartItem;
