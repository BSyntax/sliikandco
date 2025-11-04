import { createContext, useContext, useState } from "react";
import SkipperImage from "../assets/images/white-tshirt.png";
import JeansImage from "../assets/images/jeans.png";
import BootsImage from "../assets/images/hiking-boots.png";
import JacketImage from "../assets/images/wool-jacket.png";
import CardiganImage from "../assets/images/cardigan.png";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([
    {
      id: 1,
      name: "Classic Green Skipper",
      price: 249.99,
      quantity: 1,
      size: "M",
      sizeType: "Size",
      image: SkipperImage,
    },
    {
      id: 2,
      name: "Slim Fit Jeans",
      price: 599.99,
      quantity: 1,
      size: "32",
      sizeType: "Waist",
      image: JeansImage,
    },
    {
      id: 3,
      name: "Suede Hiking boots",
      price: 1299.99,
      quantity: 1,
      size: "42",
      sizeType: "EU",
      image: BootsImage,
    },
    {
      id: 4,
      name: "Shearling-Collared Wool Jacket",
      price: 799.99,
      quantity: 1,
      size: "S",
      sizeType: "Size",
      image: JacketImage,
    },
    {
      id: 5,
      name: "Button-up Cardigan",
      price: 1499.99,
      quantity: 1,
      size: "L",
      sizeType: "Size",
      image: CardiganImage,
    },
  ]);

  const addCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeCart(id);
      return;
    }
    setCart((prev) => prev.map((i) => (i.id === id ? { ...i, quantity } : i)));
  };

  const removeCart = (id) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  return (
    <CartContext.Provider value={{ cart, addCart, updateQuantity, removeCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
