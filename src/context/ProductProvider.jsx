import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import api from "../utils/axios";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadProducts = useCallback(async () => {
    try {
      // Fetch products by setting a high limit to maintain client-side filtering/sorting
      const { data } = await api.get("/products?limit=100");

      // Map _id to id for frontend compatibility
      const mappedProducts = data.products.map((product) => ({
        ...product,
        id: product._id ? String(product._id) : product.id,
      }));

      setProducts(mappedProducts);
      setLoading(false);
    } catch (err) {
      console.error("Failed to load products:", err);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const getProductById = (id) => {
    return products.find((product) => String(product.id) === String(id));
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        getProductById,
        refreshProducts: loadProducts,
      }}
    >
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
