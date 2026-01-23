import React, { useState } from "react";
import BreadCrumb from "../components/wishitem/BreadCrumb";
import ProductGrid from "../components/productGrid/ProductGrid";
import FilterEdit from "../components/filter/FilterEdit";
import SideBar from "../components/sidebar/SideBar";
import Pagination from "../components/pagination/Pagination";
import FollowUs from "../components/followUs/FollowUs";
import "../components/navigation/ShopFilters.css";
import { IoChevronDown } from "react-icons/io5";
import { LuSlidersHorizontal } from "react-icons/lu";

import SidePanel from "../components/navigation/SidePanel";
import { BiFilterAlt } from "react-icons/bi";

export default function ShopProducts() {
  const [selectedSort, setSelectedSort] = useState("");
  const [itemCount, setItemCount] = useState(0);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 2000 });
  const [showFilterPanel, setShowFilterPanel] = useState(false);

  const productsPerPage = 12;

  const handleFilterChange = (type, value) => {
    setSelectedFilters((prev) => {
      const previousValues = prev[type] || [];
      const alreadySelected = previousValues.includes(value);

      const updatedValues = alreadySelected
        ? previousValues.filter((v) => v !== value)
        : [...previousValues, value];

      if (updatedValues.length === 0) {
        const { [type]: _removed, ...rest } = prev;
        return rest;
      }

      return {
        ...prev,
        [type]: updatedValues,
      };
    });
    setCurrentPage(1);
  };

  const handleCleartFilter = () => {
    setSelectedFilters({});
    setCurrentPage(1);
  };

  return (
    <>
      <BreadCrumb from="Home" current="Shop" />
      <div className={`shop-page-flex container`}>
        <button
          className="mobile-filter-toggle"
          onClick={() => setShowFilterPanel(true)}
        >
          <LuSlidersHorizontal size={18} />
          <span>Filter</span>
          <IoChevronDown size={18} />
        </button>

        <SidePanel
          open={showFilterPanel}
          onClose={() => setShowFilterPanel(false)}
        >
          <div className="mobile-sidebar-content">
            <SideBar
              onFilterChange={handleFilterChange}
              handleCleartFilter={handleCleartFilter}
              selectedFilter={selectedFilters}
              minPrice={priceRange.min}
              maxPrice={priceRange.max}
              onPriceChange={(range) => {
                setPriceRange(range);
                setCurrentPage(1);
              }}
            />
          </div>
        </SidePanel>

        <div className="desktop-sidebar">
          <SideBar
            onFilterChange={handleFilterChange}
            handleCleartFilter={handleCleartFilter}
            selectedFilter={selectedFilters}
            minPrice={priceRange.min}
            maxPrice={priceRange.max}
            onPriceChange={(range) => {
              setPriceRange(range);
              setCurrentPage(1);
            }}
          />
        </div>
        <div className="shop-products">
          <div className="shop-products-container">
            <FilterEdit
              itemCount={itemCount}
              setSelectedSort={setSelectedSort}
              initialText="Products Found"
              onFilterClick={() => setShowFilterPanel(true)}
            />
            <ProductGrid
              selectedSort={selectedSort}
              selectedFilter={selectedFilters}
              minPrice={priceRange.min}
              maxPrice={priceRange.max}
              onCountChange={setItemCount}
              pageType="shop"
              currentPage={currentPage}
              productsPerPage={productsPerPage}
            />
          </div>

          <Pagination
            productsPerPage={productsPerPage}
            totalProducts={itemCount}
            paginate={setCurrentPage}
            currentPage={currentPage}
          />
        </div>
      </div>
      <FollowUs />
    </>
  );
}
