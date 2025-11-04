import { createContext, useContext, useState } from "react";
import { useCart } from "./CartProvider";
import SkipperImage from "../assets/images/white-tshirt.png";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([
    {
      id: 1,
      name: "Classic Green Skipper",
      price: 249.99,
      quantity: 1,
      size: "M",
      sizeType: "Size",
      stock: "In Stock",
      image: SkipperImage,
      dateAdded: new Date(),
    },
  ]);

  const { addCart } = useCart();

  const handleAddCart = (product) => {
    addCart(product);
    removeFromWishlist(product.id);
  };

  const addToWishlist = (product) => {
    setWishlist([...wishlist, product]);
  };

  const removeFromWishlist = (productId) => {
    setWishlist(wishlist.filter((product) => product.id !== productId));
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist, handleAddCart }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export function useWishlist() {
  return useContext(WishlistContext);
}
