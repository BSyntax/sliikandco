import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import BreadCrumb from "../components/wishitem/BreadCrumb";
import { useProducts } from "../context/ProductProvider";
import { useWishlist } from "../context/WishlistProvider";
import { useCart } from "../context/CartProvider";
import ProductImages from "../components/product/ProductMedia";
import ProductHeader from "../components/product/ProductHeader";
import ProductPrice from "../components/product/ProductPrice";
import ProductSizes from "../components/product/ProductSizes";
import ProductActions from "../components/product/ProductActions";
import WhyShopWithUs from "../components/whyUs/WhyShopWithUs";
import whyUsImage01 from "../assets/images/why-us-01.webp";
import whyUsImage02 from "../assets/images/why-us-02.webp";
import whyUsImage03 from "../assets/images/why-us-03.webp";
import Newsletter from "../components/newsletter/NewsletterSignup ";
import Reviews from "../components/reviews/Reviews";
import ProductColors from "../components/product/ProductColors";
import CollectionHeader from "../components/collectionHeader/CollectionHeader";
import ProductGrid from "../components/productGrid/ProductGrid";

export default function ProductDetails() {
  const { id } = useParams();
  const { products, loading } = useProducts();
  const { addCart } = useCart();
  const navigate = useNavigate();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const [selectedSize, setSelectedSize] = useState(null);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedGender, setSelectedGender] = useState("Men");
  const [selectedColor, setSelectedColor] = useState(null);
  const [changeImage, setChangeImage] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const product = products.find((item) => String(item.id) === id);

  useEffect(() => {
    if (product) {
      if (product.sizesAvailable && product.sizesAvailable.length > 0) {
        setSelectedSize(product.sizesAvailable[0]);
      }

      if (product.colors.length > 0) {
        setSelectedColor(product.colors[0].name);
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

  const handleColorSelect = (color) => {
    setSelectedColor(color);
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
      quantity: quantity,
      size: selectedSize,
      sizeType: product.sizeType,
      image: product.image,
      selectedColor: selectedColor,
    });
  };

  const handleQuantityIncrease = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleQuantityDecrease = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  const handleBuy = () => {
    if (!product) return;
    if (!selectedSize) {
      alert("Please select a size before adding to cart.");
      return;
    }
    navigate("/checkout");
  };

  const whyChooseUs = [
    {
      title: "Premium Materials",
      image: whyUsImage01,
      description: "Made to feel soft and last long.",
    },
    {
      title: "Comfort-Focused Fit",
      image: whyUsImage02,
      description: "Tailored to move with your body.",
    },
    {
      title: "Hassle-Free Shipping",
      image: whyUsImage03,
      description: "Delivered fast across South Africa.",
    },
  ];

  return (
    <>
      <BreadCrumb current={product.name} />
      <section className="product-details container">
        <div className="product-grid">
          <div className="grid-left">
            <ProductImages
              imageToShow={imageToShow}
              product={product}
              onImageChange={handleImageChange}
            />
          </div>

          <div className="grid-right">
            <div className="grid-content">
              <ProductHeader
                product={product}
                rating={product.rating}
                selectedColor={selectedColor}
              />
              <ProductPrice product={product} finalPrice={finalPrice} />
              <p className="product-description">{product.description}</p>
              <ProductColors
                product={product}
                handleColorSelect={handleColorSelect}
              />
              <ProductSizes
                product={product}
                selectedSize={selectedSize}
                onSelectSize={handleSizeSelect}
              />
              <ProductActions
                onAddToCart={handleAddToCart}
                isWishlisted={isWishlisted}
                onToggleWishlist={toggleWishlist}
                onBuy={handleBuy}
                product={product}
                quantity={quantity}
                onQuantityIncrease={handleQuantityIncrease}
                onQuantityDecrease={handleQuantityDecrease}
              />
              <div className="product-additional-info">
                <p>SKU: {product.sku}</p>
                <p>Category: {product.category}</p>
                <p>Tags: {product.tags.join(", ")}</p>
                <p>
                  In Stock:{" "}
                  <span
                    style={
                      product.inStock
                        ? { color: "#393e41" }
                        : { color: "#e5383b" }
                    }
                  >
                    {product.inStock ? "Available" : "Not Available"}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Reviews product={product} />
      <CollectionHeader
        title="Best Sellers"
        showGenderToggle={false}
        selectedGender={selectedGender}
        onGenderChange={setSelectedGender}
      />
      <ProductGrid headerTitle="Best Sellers" gender={selectedGender} />
      <WhyShopWithUs whyChooseUs={whyChooseUs} />
      <Newsletter />
    </>
  );
}
