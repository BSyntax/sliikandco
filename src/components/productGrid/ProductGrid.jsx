import React from "react";
import ProductCard from "../ProductCard/ProductCard";
import { useProducts } from "../../context/ProductProvider";
import PropTypes from "prop-types";
PropTypes;

export default function ProductGrid({ headerTitle, gender }) {
  const products = useProducts().products;

  let filteredProducts = undefined;

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
  }

  return (
    <section className="product-grid container">
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  );
}

ProductGrid.propTypes = {
  headerTitle: PropTypes.string,
  gender: PropTypes.string,
};

ProductGrid.defaultProps = {
  headerTitle: "",
  gender: "Men",
};
