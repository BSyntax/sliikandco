import React, { useState } from "react";
import Hero from "../components/hero/Hero";
import CollectionGrid from "../components/collectionGrid/CollectionGrid";
import CompanyLogosShowcase from "../components/companyLogos/CompanyLogosShowcase ";
import CollectionHeader from "../components/collectionHeader/CollectionHeader";
import ProductGrid from "../components/productGrid/ProductGrid";

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
      </main>
    </>
  );
}
