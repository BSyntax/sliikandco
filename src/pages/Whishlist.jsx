import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import WishItem from "../components/wishitem/WishItem";
import Nav from "../components/navigation/Nav";
import Footer from "../components/footer/Footer";
import BreadCrumb from "../components/wishitem/BreadCrumb";
import TopButton from "../components/controls/TopButton";
import WishlistImage from "../assets/images/wishlist-image.jpg";

export default function Wishlist() {
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState(() => {
    try {
      const stored = localStorage.getItem("wishlist");
      return stored
        ? JSON.parse(stored)
        : [
            {
              id: 1,
              name: "Men's Casual Jacket",
              price: 100,
              image: WishlistImage,
            },
          ];
    } catch (error) {
      console.error("Error parsing wishlist from localStorage:", error);
      return [];
    }
  });
  console.log(wishlist);
  const [wishlistCount, setWishlistCount] = useState(wishlist.length);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    setWishlistCount(wishlist.length);
  }, [wishlist]);

  const handleAddCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    console.log("Added to cart:", product.name);
    console.log("Current wishlist count:", wishlist.length);
  };

  const removeFromWishlist = (productId) => {
    setWishlist(wishlist.filter((item) => item.id !== productId));
  };

  return (
    <>
      <Nav />
      <div className="wishlist">
        <div className="wishlist-container">
          <BreadCrumb from="Home" current="Wishlist" />
          <div className="wishlist-items container">
            <div className="wishlist-headers">
              <h3>Product Name</h3>
              <h3>Price</h3>
              <h3>Stock Status</h3>
            </div>
            {wishlist.length > 0 ? (
              wishlist.map((product) => (
                <WishItem
                  key={product.id}
                  product={product}
                  handleAddCart={() => handleAddCart(product)}
                  removeFromWishlist={() => removeFromWishlist(product.id)}
                />
              ))
            ) : (
              <p>Your wishlist is empty</p>
            )}
          </div>
        </div>
      </div>
      <TopButton />
      <Footer />
    </>
  );
}
