import React from "react";
import ProductCard from "../ProductCard/ProductCard";
import { useProducts } from "../../context/ProductProvider";

export default function ProductGrid({ gender }) {
  const products = useProducts().products;
  const filteredProducts = products.filter((p) => p.gender === gender);
  return (
    <section className="product-grid container">
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </section>
  );
}
