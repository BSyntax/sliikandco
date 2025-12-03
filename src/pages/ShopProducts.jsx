import React, { useState } from "react";
import BreadCrumb from "../components/wishitem/BreadCrumb";
import ProductGrid from "../components/productGrid/ProductGrid";
import FilterEdit from "../components/filter/FilterEdit";
import SideBar from "../components/sidebar/SideBar";
import Pagination from "../components/pagination/Pagination";
import FollowUs from "../components/followUs/FollowUs";

export default function ShopProducts() {
  const [selectedSort, setSelectedSort] = useState("");
  const [itemCount, setItemCount] = useState(0);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 2000 });

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
      <BreadCrumb current={"shop"} />
      <div className="shop-page-flex container">
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
        <div className="shop-products">
          <div className="shop-products-container">
            <FilterEdit
              itemCount={itemCount}
              setSelectedSort={setSelectedSort}
              initialText="Products Found"
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
