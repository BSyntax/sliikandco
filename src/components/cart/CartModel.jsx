import React, { useState, useCallback } from "react";
import { RiCloseFill } from "react-icons/ri";
import ShoppingBag from "../../assets/images/shopping-bag.png";
import SkipperImage from "../../assets/images/white-tshirt.png";
import JeansImage from "../../assets/images/jeans.png";
import BootsImage from "../../assets/images/hiking-boots.png";
import JacketImage from "../../assets/images/wool-jacket.png";
import CardiganImage from "../../assets/images/cardigan.png";
import useLockBodyScroll from "../../hooks/useLockBodyScroll";
import Button from "../controls/Button";
import CartItem from "./CartItem";
import PropTypes from "prop-types";

export default function CartModel({ cartModalOpen, setCartModalOpen }) {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Classic Green Skipper",
      price: 249.99,
      quantity: 1,
      size: "M",
      sizeType: "Size",
      image: SkipperImage,
    },
    {
      id: 2,
      name: "Slim Fit Jeans",
      price: 599.99,
      quantity: 1,
      size: "32",
      sizeType: "Waist",
      image: JeansImage,
    },
    {
      id: 3,
      name: "Suede Hiking boots",
      price: 1299.99,
      quantity: 1,
      size: "42",
      sizeType: "EU",
      image: BootsImage,
    },
    {
      id: 4,
      name: "Shearling-Collared Wool Jacket",
      price: 799.99,
      quantity: 1,
      size: "S",
      sizeType: "Size",
      image: JacketImage,
    },
    {
      id: 5,
      name: "Button-up Cardigan",
      price: 1499.99,
      quantity: 1,
      size: "L",
      sizeType: "Size",
      image: CardiganImage,
    },
  ]);
  useLockBodyScroll(cartModalOpen);

  const handleDelete = useCallback((id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  }, []);

  const handleQuantityChange = useCallback((id, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: quantity } : item
      )
    );
  }, []);

  const handleCheckout = () => {
    console.log("Proceeding to checkout");
  };

  const total = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
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
            {cartItems.length > 0 ? (
              <div className="item-container">
                {cartItems.map((item) => (
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
