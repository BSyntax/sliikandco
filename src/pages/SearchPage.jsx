// Search.jsx
import React, { useState } from "react";
import BreadCrumb from "../components/wishitem/BreadCrumb";
import ProductGrid from "../components/productGrid/ProductGrid";
import FilterEdit from "../components/filter/FilterEdit";

export default function Search() {
  const [selectedSort, setSelectedSort] = useState("");
  const [itemCount, setItemCount] = useState(0);

  const query = new URLSearchParams(window.location.search).get("query") || "";

  return (
    <>
      <BreadCrumb from="Home" current="Search" />

      <FilterEdit itemCount={itemCount} setSelectedSort={setSelectedSort} initialText="Items Found" />

      <section className="search-page container">
        <ProductGrid
          searchText={query}
          selectedSort={selectedSort}
          onCountChange={setItemCount}
          pageType="search"
        />
      </section>
    </>
  );
}
