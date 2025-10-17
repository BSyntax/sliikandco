import React from "react";
import img1 from "../../assets/images/hero-4.png";
import img2 from "../../assets/images/hero-2.jpg";

export default function Hero() {
  return (
    <div className="hero">
      <div className="hero-image">
        <img src={img1} alt="hero image 1" />
        <img src={img2} alt="hero image 2" />
      </div>
      <div className="hero-text">
        <h1>Explore Sliik & Co.</h1>
        <p>
          Discover curated collections of premium men’s and women’s
          fashion—experience style and elegance from the comfort of your home.
        </p>
        <button className="hero-button">Explore</button>
      </div>
    </div>
  );
}
