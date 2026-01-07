import React from "react";
import { useWishlist } from "../../context/WishlistProvider";
import WishItem from "../wishitem/WishItem";
import Button from "../controls/Button";
import image from "../../assets/images/shopping.webp";
import "../../index.css";
import "./Wishlist.css";
import { useNavigate } from "react-router-dom";

export default function Wishlist() {
  const { wishlist, handleAddCart, removeFromWishlist } = useWishlist();

  const navigate = useNavigate();
  return (
    <div className="wishlist-container">
      {wishlist.length === 0 ? (
        <div className="wishlist-empty">
          <h3 className="wishlist-empty-heading">Your Wishlist is Empty</h3>

          <div className="wishlist-empty-content">
            <p>Start adding items you love!</p>
            <Button
              text="Continue Shopping"
              onClick={() => navigate("/shop")}
              type="button"
            />
          </div>
        </div>
      ) : (
        <div className="wishlist-items">
          <div className="wishlist-header">
            <p className="header-product">Product</p>
            <p className="header-price">Price</p>
            <p className="header-date">Date Added</p>
            <p className="header-status">Stock Status</p>
            <p className="header-actions">Actions</p>
          </div>
          {wishlist.map((item) => (
            <WishItem
              key={item.id}
              product={item}
              handleAddCart={() => handleAddCart(item)}
              removeFromWishlist={() => removeFromWishlist(item.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
