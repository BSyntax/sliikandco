import { useParams } from "react-router-dom";
import BreadCrumb from "../components/wishitem/BreadCrumb";
import Button from "../components/controls/Button";
import { LuHeart } from "react-icons/lu";
import { useProducts } from "../context/ProductProvider";

export default function ProductDetails() {
  const { id } = useParams();
  const { products, loading } = useProducts();

  if (loading) {
    return (
      <section className="product-details container">
        <div className="loader">Loading product...</div>
      </section>
    );
  }


  if (!products || products.length === 0) {
    return <p className="no-product">No products available.</p>;
  }

  const product = products.find((item) => item.id == id);

  if (!product) {
    return <p className="no-product">Product not found.</p>;
  }

  return (
    <>
      <BreadCrumb current={product.name} />
      <section className="product-details container">
        <div className="product-grid">
          <div className="grid-left">
            <div className="product-img">
              <img src={product.image} alt={product.name} loading="lazy" />
            </div>
          </div>

          <div className="grid-right">
            <div className="product-header">
              <h2 className="product-title">{product.name}</h2>
              <button className="wishlist-btn">
                <LuHeart size={24} />
              </button>
            </div>

            <p className="product-price">R{product.price.toFixed(2)}</p>
            <p className="product-description">{product.description}</p>

            <div className="product-actions">
              <Button text="Add to Cart" variant="primary" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
