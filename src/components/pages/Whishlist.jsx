import React from "react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import WishItem from "../wishitem/WishItem";
import Nav from "../navigation/Nav";
import Footer from "../footer/Footer";
import BreadCrumb from "../wishitem/BreadCrumb";
import TopButton from "../controls/TopButton";

export default function Whishlist() {
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState([]);
  const [wishlistCount, setWishlistCount] = useState(0);

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
            <WishItem />
            <WishItem />
          </div>
        </div>
      </div>
      <TopButton />
      <Footer />
    </>
  );
}
