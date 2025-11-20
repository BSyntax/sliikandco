import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import BreadCrumb from "../components/wishitem/BreadCrumb";
import Button from "../components/controls/Button";
import { LuHeart } from "react-icons/lu";
import { TbHeartFilled } from "react-icons/tb";
import { useProducts } from "../context/ProductProvider";
import { useWishlist } from "../context/WishlistProvider";
import { useCart } from "../context/CartProvider";

export default function ProductDetails() {
  const { id } = useParams();
  const { products, loading } = useProducts();
  const { addCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const [selectedSize, setSelectedSize] = useState(null);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [changeImage, setChangeImage] = useState(null);

  const product = products.find((item) => String(item.id) === id);

  useEffect(() => {
    if (product) {
      if (product.sizesAvailable && product.sizesAvailable.length > 0) {
        setSelectedSize(product.sizesAvailable[0]);
      }
      setIsWishlisted(wishlist.some((item) => item.id === product.id));
    }
  }, [product, wishlist]);

  if (loading) {
    return (
      <section className="product-details container">
        <div className="loader">Loading product...</div>
      </section>
    );
  }

  if (!product) {
    return <p className="no-product">Product not found.</p>;
  }

  const finalPrice = product.isOnSale
    ? product.price * (1 - (product.discountPercent || 0) / 100)
    : product.price;

  const imageToShow = changeImage || product.image;

  const handleImageChange = (imageUrl) => {
    setChangeImage(imageUrl);
  };

  const toggleWishlist = () => {
    if (!product) return;
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
    setIsWishlisted(!isWishlisted);
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  const handleAddToCart = () => {
    if (!product) return;
    if (!selectedSize) {
      alert("Please select a size before adding to cart.");
      return;
    }
    addCart({
      id: product.id,
      name: product.name,
      price: finalPrice,
      quantity: 1,
      size: selectedSize,
      sizeType: product.sizeType,
      image: product.image,
    });
  };

  return (
    <>
      <BreadCrumb current={product.name} />
      <section className="product-details container">
        <div className="product-grid">
          <div className="grid-left">
            <div className="product-img">
              <img src={imageToShow} alt={product.name} loading="lazy" />
            </div>
            <div className="image-varaints">
              {product.gallery &&
                product.gallery.map((img, index) => (
                  <div
                    className="variant"
                    key={index}
                    onClick={() => handleImageChange(img)}
                  >
                    <img src={img} alt={`${product.name} variant ${index}`} />
                  </div>
                ))}
            </div>
          </div>

          <div className="grid-right">
            <div className="grid-content">
              <div className="product-header">
                <h2 className="product-title">{product.name}</h2>
                <button className="wishlist-btn" onClick={toggleWishlist}>
                  {isWishlisted ? (
                    <TbHeartFilled size={24} />
                  ) : (
                    <LuHeart size={24} />
                  )}
                </button>
              </div>

              <div className="product-price">
                {product.isOnSale ? (
                  <div className="price-on-sale">
                    <span className="original-price">
                      {`R${product.price.toFixed(2)}`}
                    </span>
                    -<span>{`R${finalPrice.toFixed(2)}`}</span>
                  </div>
                ) : (
                  `R${finalPrice.toFixed(2)}`
                )}
              </div>
              <p className="product-description">{product.description}</p>
              <div className="product-colors">
                {product.colors && product.colors.length > 0 ? (
                  <ul className="color-list">
                    {product.colors.map((color, index) => (
                      <li key={index} style={{ backgroundColor: color }}></li>
                    ))}
                  </ul>
                ) : null}
              </div>
              <div className="size-group">
                {product.sizesAvailable.map((size) => (
                  <button
                    key={size}
                    type="button"
                    className={`size-button${
                      selectedSize === size ? " size-active" : ""
                    }`}
                    style={
                      selectedSize === size
                        ? { background: "#cfcbca", color: "#ffffff" }
                        : {}
                    }
                    onClick={() => handleSizeSelect(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
              <div className="product-actions">
                <Button
                  text="Add to Cart"
                  variant="primary"
                  onClick={handleAddToCart}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
