import React from "react";
import ProductCard from "../ProductCard/ProductCard";
import { useCart } from "../../context/CartProvider";

export default function ProductGrid() {
  const { cart } = useCart();
  const displayedProducts = cart.slice(0, 8);
  return (
    <section className="product-grid container">
      {displayedProducts.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </section>
  );
}
