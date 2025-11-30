import ProductCard from "../ProductCard/ProductCard";
import { useProducts } from "../../context/ProductProvider";
import PropTypes from "prop-types";
import { useEffect, useMemo } from "react";

export default function ProductGrid({
  headerTitle,
  gender,
  searchText,
  selectedSort,
  selectedFilter,
  onCountChange,
  pageType,
  onProductClick,
  currentPage,
  productsPerPage,
}) {
  const { products } = useProducts();

  const filteredProducts = useMemo(() => {
    let newFilteredProducts = [];

    // Initial product list based on page type
    if (pageType === "shop") {
      newFilteredProducts = [...products];
    } else if (searchText) {
      newFilteredProducts = products.filter((p) =>
        p.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (pageType == "/" || pageType == "product-details") {
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

    // Apply sidebar filters if a filter is selected
    if (pageType === "shop" && selectedFilter) {
      const { type, value } = selectedFilter;
      newFilteredProducts = newFilteredProducts.filter((p) => {
        if (type === "color") {
          return p.colors.some((c) => c.name === value);
        }
        if (type === "size") {
          return p.sizesAvailable.includes(value);
        }
        // Ensure property exists before comparing
        const prop = type.toLowerCase();
        return p.hasOwnProperty(prop) && p[prop] === value;
      });
    }

    // Apply sorting
    if (pageType === "shop" || pageType === "search") {
      switch (selectedSort) {
        case "Price: Low to High":
          newFilteredProducts.sort((a, b) => a.price - b.price);
          break;
        case "Price: High to Low":
          newFilteredProducts.sort((a, b) => b.price - a.price);
          break;
        case "Newest":
          newFilteredProducts.sort((a, b) => (b.isNew ? 1 : -1));
          break;
        default:
          if (selectedSort) {
            console.warn(`Sort option "${selectedSort}" is not handled.`);
          }
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
    selectedFilter,
  ]);

  useEffect(() => {
    if (onCountChange) {
      onCountChange(filteredProducts.length);
    }
  }, [filteredProducts, onCountChange]);

  // Calculate products for the current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  console.log(currentProducts);
  return (
    <div
      className={`product-grid ${
        pageType === "shop" ? "product-grid--shop" : ""
      } ${searchText ? "product-grid--search" : ""} container`}
    >
      {currentProducts.length > 0 && pageType == "shop"
        ? currentProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onProductClick={onProductClick}
            />
          ))
        : filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onProductClick={onProductClick}
            />
          ))}
    </div>
  );
}

ProductGrid.propTypes = {
  headerTitle: PropTypes.string,
  gender: PropTypes.string,
  searchText: PropTypes.string,
  selectedSort: PropTypes.string,
  selectedFilter: PropTypes.object,
  onCountChange: PropTypes.func,
  pageType: PropTypes.string,
  onProductClick: PropTypes.func,
  currentPage: PropTypes.number,
  productsPerPage: PropTypes.number,
};

ProductGrid.defaultProps = {
  headerTitle: "",
  gender: "Men",
  searchText: "",
  selectedSort: "",
  selectedFilter: null,
  onCountChange: null,
  pageType: "",
  onProductClick: null,
  currentPage: 1,
  productsPerPage: 12,
};
