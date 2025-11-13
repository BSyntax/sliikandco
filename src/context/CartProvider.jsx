import { createContext, useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { store_products } from "../../data/products";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(store_products.slice(0, 4));

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
    console.log("removeCart", id);
  };

  return (
    <CartContext.Provider value={{ cart, addCart, updateQuantity, removeCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
