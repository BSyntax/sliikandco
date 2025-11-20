import { createContext, useContext, useState, useCallback } from "react";
import { useCart } from "./CartProvider";
import { useProducts } from "../context/ProductProvider";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { products } = useProducts();
  const { addCart } = useCart();

  const [wishlist, setWishlist] = useState(() => {
    const firstProduct = products[0];
    return firstProduct ? [firstProduct] : [];
  });

  const addToWishlist = useCallback((product) => {
    if (!product?.id) {
      console.warn("addToWishlist: Product missing id", product);
      return;
    }

    setWishlist((prev) => {
      if (prev.some((item) => item.id === product.id)) {
        return prev;
      }
      return [...prev, { ...product, dateAdded: Date.now() }];
    });
  }, []);

  const removeFromWishlist = useCallback((productId) => {
    if (!productId) return;
    setWishlist((prev) => prev.filter((item) => item.id !== productId));
  }, []);

  const handleAddCart = useCallback(
    (product) => {
      if (!product?.id) {
        console.warn("handleAddCart: Invalid product", product);
        return;
      }

      addCart(product);
      removeFromWishlist(product.id);
    },
    [addCart, removeFromWishlist]
  );

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        handleAddCart,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within WishlistProvider");
  }
  return context;
};
