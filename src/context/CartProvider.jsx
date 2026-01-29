import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const generateId = () => {
    if (typeof crypto !== "undefined" && crypto.randomUUID) {
      return crypto.randomUUID();
    }
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  };

  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem("cart");
      const parsedCart = savedCart ? JSON.parse(savedCart) : [];
      // Migration: Ensure all items have a unique cartItemId
      return parsedCart.map((item) => ({
        ...item,
        cartItemId: item.cartItemId || generateId(),
      }));
    } catch (error) {
      console.error("Failed to load cart from localStorage:", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch (error) {
      console.error("Failed to save cart to localStorage:", error);
    }
  }, [cart]);

  const addCart = (product) => {
    setCart((prev) => {
      const existing = prev.find(
        (i) =>
          i.id === product.id &&
          i.size === product.size &&
          i.selectedColor === product.selectedColor,
      );

      if (existing) {
        // limit quantity to 10 per item or stock count if available
        const maxQty = product.countInStock || 10;
        if (existing.quantity >= maxQty) return prev;

        return prev.map((i) =>
          i.cartItemId === existing.cartItemId
            ? { ...i, quantity: i.quantity + 1 }
            : i,
        );
      }
      return [...prev, { ...product, quantity: 1, cartItemId: generateId() }];
    });
  };

  const updateQuantity = (cartItemId, quantity) => {
    if (quantity <= 0) {
      removeCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((i) => (i.cartItemId === cartItemId ? { ...i, quantity } : i)),
    );
  };

  const removeCart = (cartItemId) => {
    setCart((prev) => prev.filter((i) => i.cartItemId !== cartItemId));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, addCart, updateQuantity, removeCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
