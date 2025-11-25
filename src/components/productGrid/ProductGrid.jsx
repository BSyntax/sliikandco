import ProductCard from "../ProductCard/ProductCard";
import { useProducts } from "../../context/ProductProvider";
import PropTypes from "prop-types";
import { useEffect, useMemo } from "react";

export default function ProductGrid({
  headerTitle,
  gender,
  searchText,
  selectedSort,
  onCountChange,
  pageType,
  onProductClick,
}) {
  const { products } = useProducts();

  const filteredProducts = useMemo(() => {
    let newFilteredProducts = [];

    if (searchText) {
      newFilteredProducts = products.filter((p) =>
        p.name.toLowerCase().includes(searchText.toLowerCase())
      );
    } else {
      switch (headerTitle) {
        case "Best Sellers":
          newFilteredProducts = [...products]
            .sort((a, b) => a.price - b.price)
            .slice(0, 4);
          break;

        case "New Arrivals":
          newFilteredProducts = products
            .filter((p) => p.isNew && p.gender === gender)
            .slice(0, 8);
          break;

        default:
          newFilteredProducts = products
            .filter((p) => p.gender === gender)
            .slice(0, 8);
          break;
      }
    }

    if (pageType === "search") {
      switch (selectedSort) {
        case "Price: Low to High":
          newFilteredProducts.sort((a, b) => a.price - b.price);
          break;

        case "Price: High to Low":
          newFilteredProducts.sort((a, b) => b.price - a.price);
          break;

        case "Newest":
          newFilteredProducts = newFilteredProducts.filter((p) => p.isNew);
          break;

        default:
          break;
      }
    }
    return newFilteredProducts;
  }, [
    products,
    searchText,
    headerTitle,
    gender,
    pageType,
    selectedSort,
  ]);

  useEffect(() => {
    if (onCountChange) {
      onCountChange(filteredProducts.length);
    }
  }, [filteredProducts, onCountChange]);

  return (
    <div
      className={`product-grid ${
        searchText ? "product-grid--search" : ""
      } container`}
    >
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} onProductClick={onProductClick} />
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
  selectedSort: PropTypes.string,
  onCountChange: PropTypes.func,
  pageType: PropTypes.string,
  onProductClick: PropTypes.func,
};

ProductGrid.defaultProps = {
  headerTitle: "",
  gender: "Men",
  searchText: "",
  selectedSort: "",
  onCountChange: null,
  pageType: "",
  onProductClick: null,
};
