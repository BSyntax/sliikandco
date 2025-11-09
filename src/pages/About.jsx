import React from "react";
import BreadCrumb from "../components/wishitem/BreadCrumb";
import LookbookGallery from "../components/lookbookGallery/LookbookGallery";
import Button from "../components/controls/Button";
import AboutGallery1 from "../assets/images/about-gallery-1.webp";
import AboutGallery2 from "../assets/images/about-gallery-2.webp";
import PerksBar from "../components/perksBar/PerksBar";
import NewsletterSignup from "../components/newsletter/NewsletterSignup ";
import AboutHeroContent from "../components/about/AboutHeroContent";
import TeamSection from "../components/about/TeamSection";

export default function About() {
  return (
    <>
      <BreadCrumb from="Home" current="About" />

      <section className="about-section">
        <div className="about-container container">
          <div className="about-content">
            <div className="about-text">
              <h4 className="about-heading">About Us</h4>
              <h2 className="about-title">Our Story</h2>
              <p className="about-description">
                At Sliik & Co, fashion isn’t just about what you wear—it’s about
                confidence, creativity, and expression. Our journey began with a
                simple mission: to bring you timeless pieces that blend comfort,
                quality, and individuality. Every collection we create is
                inspired by modern living and the spirit of self-expression.
              </p>
              <p className="about-description">
                We believe that fashion is more than just clothing—it’s a form
                of self-expression, a reflection of your personality and values.
                Our collections are designed to be versatile, allowing you to
                express yourself through your unique style and preferences.
              </p>
              <Button text="Read More" type="button" />
            </div>

            <div className="about-images">
              <div className="about-image">
                <img src={AboutGallery1} alt="Our studio" />
              </div>
              <div className="about-image">
                <img src={AboutGallery2} alt="Our collection" />
              </div>
            </div>
          </div>
        </div>
        <PerksBar />
        <TeamSection />
        <NewsletterSignup />
      </section>
    </>
  );
}
