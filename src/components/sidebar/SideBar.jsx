import PropTypes from "prop-types";
import React, { useMemo, useState } from "react";
import { RiDeleteBinFill } from "react-icons/ri";
import SidebarItem from "./SidebarItem";
import { useProducts } from "../../context/ProductProvider";
import { getUniqueFilterOptions } from "../../utils/filterUtils";

export default function SideBar({
  onFilterChange,
  handleCleartFilter,
  selectedFilter,
}) {
  const { products } = useProducts();

  const filterOptions = useMemo(
    () => getUniqueFilterOptions(products),
    [products]
  );

  return (
    <div className="shop-sidebar">
      <span className="sidebar-header">Filter By</span>
      {selectedFilter && (
        <div className="clear-filter">
          {
            <RiDeleteBinFill
              size={14}
              onClick={handleCleartFilter}
              color="#393e41"
            />
          }
          <span onClick={handleCleartFilter}>Clear Filter</span>
        </div>
      )}
      <div className="sidebar-content">
        {[
          { label: "Category", type: "category", options: filterOptions.categories },
          { label: "Gender", type: "gender", options: filterOptions.genders },
          { label: "Brand", type: "brand", options: filterOptions.brands },
          { label: "Color", type: "color", options: filterOptions.colors },
          { label: "Size", type: "size", options: filterOptions.sizes },
          // "Price", "Fit", "Style", "Availability" - these will be handled later if needed
        ].map((filter, index) => (
          <SidebarItem
            label={filter.label}
            type={filter.type}
            options={filter.options}
            onFilterChange={onFilterChange}
            selectedFilter={selectedFilter}
            key={index}
          />
        ))}
      </div>
    </div>
  );
}

SideBar.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
  handleCleartFilter: PropTypes.func.isRequired,
  selectedFilter: PropTypes.object,
};
