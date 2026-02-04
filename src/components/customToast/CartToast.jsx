import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { RiCloseFill } from "react-icons/ri";
import Button from "../controls/Button";
import { useCart } from "../../context/CartProvider";

import "./CartToast.css";

export default function CartToast({
  image,
  name,
  setCartModalOpen,
  setToastOpen,
}) {
  const { cart } = useCart();
  const [isClosing, setIsClosing] = useState(false);

  const handleCloseToast = () => {
    setIsClosing(true);
    setTimeout(() => {
      setToastOpen(false);
      setIsClosing(false);
    }, 300); 
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleCloseToast();
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`cart-toast ${isClosing ? "slide-out" : ""}`}>
      <div className="cart-toast-content">
        <div className="cart-toast-right">
          <div className="cart-toast-image">
            <img src={image} alt={name} />
          </div>
          <div className="cart-toast-message">
            <h3 className="cart-toast-name">{name}</h3>
            <p className="cart-toast-msg">Was added to your cart</p>
          </div>
        </div>
        <button className="cart-toast-close" onClick={handleCloseToast}>
          <RiCloseFill />
        </button>
      </div>
      <Button
        text={`View Cart (${cart.length})`}
        onClick={() => setCartModalOpen(true)}
        className="cart-toast-button"
        variant="secondary"
      />
    </div>
  );
}

CartToast.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  setCartModalOpen: PropTypes.func.isRequired,
  setToastOpen: PropTypes.func.isRequired,
};
