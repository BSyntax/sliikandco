import React from "react";
import { Link } from "react-router-dom";
export default function AnnouncementBar() {
  return (
    <div className="announcement-bar">
      <div className="container">
        <div className="left">
          <Link to={"/"}>Store location</Link>
          <Link to={"/"}>support@sliik.co</Link>
        </div>
        <div className="center">
          <p>
            🔥 Free shipping on orders over R500 + 10% off your first order!
          </p>
        </div>
        <div className="right">
          <p>Worldwide Delivery</p>
        </div>
      </div>
    </div>
  );
}
