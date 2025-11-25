import React, { useState } from "react";
import Hero from "../components/hero/Hero";
import CollectionGrid from "../components/collectionGrid/CollectionGrid";
import CompanyLogosShowcase from "../components/companyLogos/CompanyLogosShowcase ";
import CollectionHeader from "../components/collectionHeader/CollectionHeader";
import ProductGrid from "../components/productGrid/ProductGrid";
import HeroVideoBanner from "../components/videoBanner/HeroVideoBanner";
import FashionVideo from "../assets/videos/fashion-video.mp4";
import promoBannerImage from "../assets/images/promoBanner-01.webp";
import PromoBanner from "../components/promoBanner/promoBanner";
import NewsletterSignup from "../components/newsletter/NewsletterSignup";
import LookbookGallery from "../components/lookbookGallery/LookbookGallery";
import { Link, useNavigate } from "react-router-dom";
import { LuFacebook, LuInstagram, LuTwitter } from "react-icons/lu";

export default function Home() {
  const [selectedGender, setSelectedGender] = useState("Men");
  const navigate = useNavigate();
  return (
    <>
      <Hero />
      <main className="main-section">
        <CollectionHeader
          title="Trending Collections"
          showGenderToggle={false}
        />
        <CollectionGrid />
        <CompanyLogosShowcase />
        <CollectionHeader
          title="New Arrivals"
          showGenderToggle={true}
          selectedGender={selectedGender}
          onGenderChange={setSelectedGender}
        />
        <ProductGrid headerTitle="New Arrivals" gender={selectedGender} />
        <PromoBanner
          promoImage={promoBannerImage}
          promoCaption="CURATED"
          promoHeadline="Complimentary"
          promoDescription="Elevate your wardrobe with confidence. Every order includes a 1-on-1 virtual styling session with our in-house experts because great style is personal."
          promoButtonText="Book Your Session"
        />
        <HeroVideoBanner
          videoSrc={FashionVideo}
          heading="Elevate Your Style"
          subheading="Timeless pieces crafted with purpose"
          buttonText="Shop Now"
          onButtonClick={() => navigate("/shop")}
        />{" "}
        <CollectionHeader
          title="Best Sellers"
          showGenderToggle={false}
          selectedGender={selectedGender}
          onGenderChange={setSelectedGender}
        />
        <ProductGrid headerTitle="Best Sellers" gender={selectedGender} />
        <NewsletterSignup />
        <div className="stay-connected container">
          <div className="stay-connected-content">
            <span className="stay-connected-caption">Follow Us</span>
            <Link to="/" className="stay-connected-logo">
              Sliik & Co.
            </Link>
            <p className="stay-connected-description">
              Stay connected with us on social media for the latest updates,
              exclusive offers, and style inspiration. Join our community and be
              the first to know about new arrivals and special events.
            </p>
          </div>
          <div className="stay-connected-icons">
            <span className="stay-connected-icon">
              <Link
                to="https://facebook.com/sliikandco"
                aria-label="Visit our Facebook page"
              >
                <LuFacebook />
              </Link>
            </span>
            <span className="stay-connected-icon">
              <Link
                to="https://twitter.com/sliikandco"
                aria-label="Visit our Twitter page"
              >
                <LuTwitter />
              </Link>
            </span>
            <span className="stay-connected-icon">
              <Link
                to="https://instagram.com/sliikandco"
                aria-label="Visit our Instagram page"
              >
                <LuInstagram />
              </Link>
            </span>
          </div>
        </div>
      </main>
      <LookbookGallery />
    </>
  );
}
