import React from "react";
import Button from "../controls/Button";
import CenterImage from "../../assets/images/about-center.webp";
import RightImage from "../../assets/images/about-right-small.webp";

export default function AboutHeroContent() {
  return (
    <section className="hero-section">
      <div className="hero-wrapper container">
        <div className="hero-left">
          <p className="hero-text-left">
            Founded on the belief that everyone deserves to feel confident &
            stylish, Mira was born out of a love for fashion & a commitment to
            quality.
          </p>
          <Button text="Shop Now" type="button" />
        </div>

        <div className="hero-center">
          <img
            src={CenterImage}
            alt="Fashion flatlay"
            className="center-image-full"
          />
        </div>

        <div className="hero-right">
          <img
            src={RightImage}
            alt="Handbag & watch"
            className="right-image-small"
          />
          <p className="hero-text-right">
            We uphold the high standards of craftsmanship, ensuring each piece
            is made with care and attention to detail.
          </p>
        </div>
      </div>
    </section>
  );
}
