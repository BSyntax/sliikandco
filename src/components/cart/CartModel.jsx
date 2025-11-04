import React, { useCallback } from "react";
import { RiCloseFill } from "react-icons/ri";
import ShoppingBag from "../../assets/images/shopping-bag.png";
import useLockBodyScroll from "../../hooks/useLockBodyScroll";
import Button from "../controls/Button";
import CartItem from "./CartItem";
import PropTypes from "prop-types";
import { useCart } from "../../context/CartProvider";

export default function CartModel({ cartModalOpen, setCartModalOpen }) {
  const { cart, updateQuantity, removeCart } = useCart();
  useLockBodyScroll(cartModalOpen);

  const handleDelete = useCallback(
    (id) => {
      removeCart(id);
    },
    [removeCart]
  );

  const handleQuantityChange = useCallback(
    (id, quantity) => {
      updateQuantity(id, quantity);
    },
    [updateQuantity]
  );

  const handleCheckout = () => {
    console.log("Proceeding to checkout");
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity ?? 1),
    0
  );

  return (
    <>
      <div className={`cart-wrapper ${cartModalOpen ? "open" : ""}`}>
        <div className="cart-overlay" onClick={() => setCartModalOpen(false)} />
        <div className="cart-model">
          <div className="cart-model-header">
            <h2>Cart</h2>
            <span onClick={() => setCartModalOpen(false)}>
              <RiCloseFill />
            </span>
          </div>

          <div className="cart-model-body">
            {cart.length > 0 ? (
              <div className="item-container">
                {cart.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onQuantityChange={handleQuantityChange}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            ) : (
              <div className="cart-model-empty">
                <div className="shopping-bag">
                  <img src={ShoppingBag} alt="Shopping Bag" />
                </div>
                <p>Your cart is empty</p>
              </div>
            )}
          </div>

          <div className="cart-model-footer">
            <div className="cart-model-total">
              <span>Subtotal</span>
              <p>R{total.toFixed(2)}</p>
            </div>
            <div className="cart-model-checkout">
              <Button text="Checkout" action={handleCheckout} />
            </div>
            <div className="cart-model-viewcart">
              <Button text="View Cart" action={() => setCartModalOpen(false)} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

CartModel.propTypes = {
  cartModalOpen: PropTypes.bool.isRequired,
  setCartModalOpen: PropTypes.func.isRequired,
};
