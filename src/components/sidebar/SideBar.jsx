import PropTypes from "prop-types";
import React, { useMemo, useState } from "react";
import { RiDeleteBinFill } from "react-icons/ri";
import SidebarItem from "./SidebarItem";
import { useProducts } from "../../context/ProductProvider";
import { getUniqueFilterOptions } from "../../utils/filterUtils";
import PriceRange from "../controls/priceRange/PriceRange";

export default function SideBar({
  onFilterChange,
  handleCleartFilter,
  selectedFilter,
  minPrice,
  maxPrice,
  onPriceChange,
}) {
  const { products } = useProducts();

  const filterOptions = useMemo(
    () => getUniqueFilterOptions(products),
    [products]
  );

  // Map color name -> hex value from the products data
  const colorMap = useMemo(() => {
    const map = {};
    products.forEach((product) => {
      if (Array.isArray(product.colors)) {
        product.colors.forEach((color) => {
          if (color?.name && color?.hex && !map[color.name]) {
            map[color.name] = color.hex;
          }
        });
      }
    });
    return map;
  }, [products]);

  // Brand counts by brand & category (respecting any selected category filters)
  const brandCounts = useMemo(() => {
    const counts = {};

    products.forEach((product) => {
      const hasCategoryFilter =
        selectedFilter && Array.isArray(selectedFilter.category);

      const matchesCategory =
        !hasCategoryFilter || selectedFilter.category.length === 0
          ? true
          : selectedFilter.category.includes(product.category);

      if (matchesCategory) {
        counts[product.brand] = (counts[product.brand] || 0) + 1;
      }
    });

    return counts;
  }, [products, selectedFilter]);

  return (
    <div className="shop-sidebar">
      <span className="sidebar-header">Filter By</span>
      {selectedFilter && Object.keys(selectedFilter).length > 0 && (
        <div className="clear-filter">
          <RiDeleteBinFill
            size={14}
            onClick={handleCleartFilter}
            color="#393e41"
          />
          <span onClick={handleCleartFilter}>Clear Filter</span>
        </div>
      )}
      <div className="sidebar-content">
        {[
          {
            label: "Category",
            type: "category",
            options: filterOptions.categories,
          },
          { label: "Gender", type: "gender", options: filterOptions.genders },
          {
            label: "Brand",
            type: "brand",
            options: filterOptions.brands,
          },
          {
            label: "Color",
            type: "color",
            options: filterOptions.colors,
          },
          {
            label: "Size",
            type: "size",
            options: filterOptions.sizes,
          },
        ].map((filter, index) => (
          <SidebarItem
            label={filter.label}
            type={filter.type}
            options={filter.options}
            onFilterChange={onFilterChange}
            selectedFilter={selectedFilter}
            colorMap={filter.type === "color" ? colorMap : undefined}
            brandCounts={filter.type === "brand" ? brandCounts : undefined}
            key={index}
          />
        ))}
      </div>
      <PriceRange
        minLimit={0}
        maxLimit={2000}
        minValue={minPrice}
        maxValue={maxPrice}
        onChange={onPriceChange}
      />
    </div>
  );
}

SideBar.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
  handleCleartFilter: PropTypes.func.isRequired,
  selectedFilter: PropTypes.object,
  minPrice: PropTypes.number.isRequired,
  maxPrice: PropTypes.number.isRequired,
  onPriceChange: PropTypes.func.isRequired,
};
