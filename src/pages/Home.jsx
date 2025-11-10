import React from "react";
import Hero from "../components/hero/Hero";
import CollectionGrid from "../components/collectionGrid/CollectionGrid";
import CompanyLogosShowcase from "../components/companyLogos/CompanyLogosShowcase ";

export default function Home() {
  return (
    <>
      <Hero />
      <main className="main-section">
        <h2 className="section-heading container">Trending Collections</h2>
        <CollectionGrid />
        <CompanyLogosShowcase />
      </main>
    </>
  );
}
