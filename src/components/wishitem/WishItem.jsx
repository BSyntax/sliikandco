import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import WishlistImage from "../../assets/images/wishlist-image.jpg";
import Button from "../controls/Button";
import { RiCloseFill } from "react-icons/ri";

export default function WishItem() {
  const handleAddCart = () => {
    console.log("Add to cart");
  };

  return (
    <div className="wishitem">
      <div className="wishitem-product">
        <div className="cancel-icon">
          <RiCloseFill />
        </div>
        <div className="wishitem-image">
          <img src={WishlistImage} alt="Wishlist Image" />
        </div>
        <div className="product-name">
          <p>Men’s Casual Jacket</p>
        </div>
      </div>
      <p className="wishitem-price">$100</p>
      <p className="wishitem-status">In Stock</p>
      <Button text="Add to Cart" action={() => handleAddCart} type="button" />
    </div>
  );
}
