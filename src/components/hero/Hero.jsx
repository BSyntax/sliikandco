import React from "react";
import "./Hero.css";
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
          <img
            src={heroWomen}
            alt="hero image 2"
            className="women"
            fetchpriority="high"
          />
        </div>
        <div className="image-container men-container">
          <img
            src={heroMen}
            alt="hero image 1"
            className="man"
            fetchpriority="high"
          />
        </div>
      </div>

      <div className="hero-text">
        <h1>Modern Essentials</h1>
        <p>
          Timeless silhouettes. Premium fabrics. Designed in Cape Town made for
          the world.
        </p>
        <Button text="Explore Now" onClick={handleExplore} variant="primary" />
      </div>
    </div>
  );
}
