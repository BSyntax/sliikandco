import React from "react";
import heroMen from "../../assets/images/hero-men.webp";
import heroWomen from "../../assets/images/women.webp";
import Button from "../controls/Button";
import { useNavigate } from "react-router";

export default function Hero() {
  const navigate = useNavigate();

  const handleExplore = () => {
    navigate("/shop");
  };

  return (
    <div className="hero">
      <div className="hero-image">
        <div className="image-container women-container">
          <img src={heroWomen} alt="hero image 2" className="women" />
        </div>
        <div className="image-container men-container">
          <img src={heroMen} alt="hero image 1" className="man" />
        </div>
      </div>

      <div className="hero-text">
        <h1>Explore Sliik & Co.</h1>
        <p>
          Discover curated collections of premium men’s and women’s fashion
          experience style and elegance with every piece you wear.
        </p>
        <Button text="Explore" action={handleExplore} type="button" />
      </div>
    </div>
  );
}
