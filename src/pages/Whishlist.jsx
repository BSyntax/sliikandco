import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import WishItem from "../components/wishitem/WishItem";
import Nav from "../components/navigation/Nav";
import Footer from "../components/footer/Footer";
import BreadCrumb from "../components/wishitem/BreadCrumb";
import TopButton from "../components/controls/TopButton";
import { useWishlist } from "../context/WishlistProvider";
import Button from "../components/controls/Button";
import image from "../assets/images/shopping.png";

export default function Wishlist() {
  const { wishlist, removeFromWishlist, handleAddCart } = useWishlist();
  const navigate = useNavigate();

  return (
    <>
      <Nav />
      <div className="wishlist">
        <div className="wishlist-container">
          <BreadCrumb from="Home" current="Wishlist" />
          <div className="wishlist-items container">
            {wishlist.length > 0 ? (
              <>
                <div className="wishlist-headers grid-columns-5">
                  <span className="grid-column-1">Product</span>
                  <span className="grid-column-2">Price</span>
                  <span className="grid-column-3">Date Added</span>
                  <span className="grid-column-4">Stocks</span>
                  <span className="grid-column-5">Add to Cart</span>
                </div>
                {wishlist.map((product) => (
                  <WishItem
                    key={product.id}
                    product={product}
                    handleAddCart={() => handleAddCart(product)}
                    removeFromWishlist={() => removeFromWishlist(product.id)}
                  />
                ))}
              </>
            ) : (
              <div className="wishlist-empty">
                <div className="wishlist-empty-image">
                  <img src={image} alt="wishlist empty" />
                </div>
                <div className="wishlist-empty-content">
                  <p>Your wishlist is empty</p>
                  <Button
                    text="Continue Shopping"
                    action={() => navigate("/")}
                    type="button"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <TopButton />
      <Footer />
    </>
  );
}
