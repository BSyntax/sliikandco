import ProductCard from "../ProductCard/ProductCard";
import { useProducts } from "../../context/ProductProvider";
import PropTypes from "prop-types";

import { useEffect } from "react";

export default function ProductGrid({
  headerTitle,
  gender,
  searchText,
  selectedSort,
  onCountChange,
  pageType,
}) {
  const products = useProducts().products;
  let filteredProducts = [];

  if (searchText) {
    filteredProducts = products.filter((p) =>
      p.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }

  if (!searchText) {
    switch (headerTitle) {
      case "Best Sellers":
        filteredProducts = [...products]
          .sort((a, b) => a.price - b.price)
          .slice(0, 4);
        break;

      case "New Arrivals":
        filteredProducts = products
          .filter((p) => p.isNew && p.gender === gender)
          .slice(0, 8);
        break;

      default:
        filteredProducts = products
          .filter((p) => p.gender === gender)
          .slice(0, 8);
        break;
    }
  }

  if (pageType === "search") {
    switch (selectedSort) {
      case "Price: Low to High":
        filteredProducts = [...filteredProducts].sort(
          (a, b) => a.price - b.price
        );
        console.log(filteredProducts);
        break;

      case "Price: High to Low":
        filteredProducts = [...filteredProducts].sort(
          (a, b) => b.price - a.price
        );
        console.log(filteredProducts);
        break;

      case "Newest":
        filteredProducts = filteredProducts.filter((p) => p.isNew);
        break;

      default:
        break;
    }
  }

  useEffect(() => {
    if (onCountChange) onCountChange(filteredProducts.length);
  }, [searchText, selectedSort, products]);

  return (
    <div
      className={`product-grid ${
        searchText ? "product-grid--search" : ""
      } container`}
    >
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))
      ) : searchText ? (
        <p className="no-results">No products found for "{searchText}"</p>
      ) : null}
    </div>
  );
}

ProductGrid.propTypes = {
  headerTitle: PropTypes.string,
  gender: PropTypes.string,
  searchText: PropTypes.string,
};

ProductGrid.defaultProps = {
  headerTitle: "",
  gender: "Men",
  searchText: "",
};
