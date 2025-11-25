import { createContext, useContext, useState, useEffect } from "react";
import { store_products } from "../../data/products";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setProducts(store_products);
        setLoading(false);
      } catch (err) {
        console.error("Failed to load products:", err);
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const getProductById = (id) => {
    return products.find((product) => String(product.id) === String(id));
  };

  return (
    <ProductContext.Provider value={{ products, loading, getProductById }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used within ProductProvider");
  }
  return context;
};
