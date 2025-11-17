import React from "react";
import { useParams } from "react-router-dom";
import BreadCrumb from "../components/wishitem/BreadCrumb";
import Button from "../components/controls/Button";
import { LuHeart } from "react-icons/lu";
import { useProducts } from "../context/ProductProvider";

export default function ProductDetails() {
  const { id } = useParams();
  const { products } = useProducts();

  if (!products) return <p>Loading...</p>;

  const product = products.find((p) => p.id === Number(id));

  if (!product) return <p className="no-product">Product not found.</p>;

  return (
    <>
      <BreadCrumb current={product.name} />
      <section className="product-details container">
        <div className="product-grid">
          <div className="grid-left">
            <div className="product-img">
              <img
                src={product.image || "https://via.placeholder.com/400"}
                alt={product.name}
              />
            </div>
          </div>

          <div className="grid-right">
            <div className="product-header">
              <h2 className="product-title">{product.name}</h2>
              <button className="wishlist-btn">
                <LuHeart size={24} />
              </button>
            </div>

            <p className="product-price">${product.price.toFixed(2)}</p>
            <p className="product-description">{product.description}</p>

            {product.colors && product.colors.length > 0 && (
              <div className="product-colors">
                {product.colors.map((color) => (
                  <span
                    key={color}
                    style={{ backgroundColor: color }}
                    className="color-swatch"
                  ></span>
                ))}
              </div>
            )}

            <div className="product-actions">
              <Button text="Add to Cart" type="primary" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
