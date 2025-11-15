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
import PerksBar from "../components/perksBar/PerksBar";
import NewsletterSignup from "../components/newsletter/NewsletterSignup ";
import LookbookGallery from "../components/lookbookGallery/LookbookGallery";

export default function Home() {
  const [selectedGender, setSelectedGender] = useState("Men");
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
        <ProductGrid gender={selectedGender} />
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
          title="New Arrivals"
          showGenderToggle={true}
          selectedGender={selectedGender}
          onGenderChange={setSelectedGender}
        />
        <ProductGrid gender={selectedGender} />
        <NewsletterSignup />
      </main>
      <LookbookGallery />
    </>
  );
}
