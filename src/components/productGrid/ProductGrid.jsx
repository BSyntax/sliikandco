import ProductCard from "../ProductCard/ProductCard";
import "./ProductGrid.css";
import { useProducts } from "../../context/ProductProvider";
import PropTypes from "prop-types";
import { useEffect, useMemo } from "react";
import LoadingSpinner from "../common/LoadingSpinner";
import NoProducts from "../../assets/images/no-products-found.webp";

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
  minPrice,
  maxPrice,
}) {
  const { products, loading } = useProducts();

  const filteredProducts = useMemo(() => {
    let newFilteredProducts = [];

    if (pageType === "shop") {
      newFilteredProducts = [...products];
    } else if (searchText) {
      newFilteredProducts = products.filter((p) =>
        p.name.toLowerCase().includes(searchText.toLowerCase()),
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

    if (pageType === "shop") {
      if (selectedFilter && Object.keys(selectedFilter).length > 0) {
        newFilteredProducts = newFilteredProducts.filter((p) => {
          return Object.entries(selectedFilter).every(([type, values]) => {
            if (!values || values.length === 0) return true;

            if (type === "color") {
              // Product matches if it has ANY of the selected colors
              return values.some((value) =>
                p.colors.some((c) => c.name === value),
              );
            }

            if (type === "size") {
              return values.some((value) => p.sizesAvailable.includes(value));
            }

            const prop = type.toLowerCase();
            if (!Object.prototype.hasOwnProperty.call(p, prop)) return true;

            return values.includes(p[prop]);
          });
        });
      }

      if (typeof minPrice === "number" || typeof maxPrice === "number") {
        const min = typeof minPrice === "number" ? minPrice : 0;
        const max =
          typeof maxPrice === "number" ? maxPrice : Number.POSITIVE_INFINITY;

        newFilteredProducts = newFilteredProducts.filter(
          (p) => p.price >= min && p.price <= max,
        );
      }
    }

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
    minPrice,
    maxPrice,
  ]);

  useEffect(() => {
    if (onCountChange) {
      onCountChange(filteredProducts.length);
    }
  }, [filteredProducts, onCountChange]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  );

  if (loading) {
    return <LoadingSpinner />;
  }

  if (filteredProducts.length === 0) {
    return (
      <div className="no-products-found container">
        <div className="no-products-content">
          <div className="no-products-image-container">
            <img
              src={NoProducts}
              alt="No Products Found"
              className="no-products-image"
            />
          </div>
          <p>
            We couldn't find any products matching your current filters. Try
            adjusting your selections or clearing filters.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`product-grid ${
        pageType === "shop" ? "product-grid--shop" : "container"
      } ${searchText ? "product-grid--search" : ""}`}
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
  minPrice: PropTypes.number,
  maxPrice: PropTypes.number,
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
  minPrice: 0,
  maxPrice: 2000,
};
