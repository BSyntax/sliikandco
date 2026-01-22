import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize auth state from localStorage
  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      setUser(JSON.parse(userInfo));
    }
    setLoading(false);
  }, []);

  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: "Mateusz Wierzbicki",
      street: "ul. Przykładowa 123/45",
      city: "00-000 Warszawa",
      country: "Poland",
      phone: "+48 123 456 789",
      isDefault: true,
    },
    {
      id: 2,
      name: "John Doe",
      street: "123 Maple Street",
      city: "Springfield, IL 62704",
      country: "United States",
      phone: "+1 555 123 4567",
      isDefault: false,
    },
  ]);

  const login = async (email, password) => {
    try {
      const { data } = await api.post("/users/login", { email, password });
      setUser(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/profile");
      return { success: true };
    } catch (error) {
      console.error("Login Error Details:", error); // Debugging log
      let message = "An error occurred";
      if (error.response) {
        if (error.response.status === 404) {
          message = "Login service unreachable (404)";
        } else if (error.response.status === 401) {
          message = "Invalid email or password";
        } else {
          message = error.response.data.message || error.message;
        }
      } else if (error.request) {
        message =
          "Server unreachable. Please check your internet or try again later.";
      } else {
        message = error.message;
      }
      return { success: false, message };
    }
  };

  const register = async (name, email, password) => {
    try {
      const { data } = await api.post("/users", { name, email, password });
      setUser(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/profile");
      return { success: true };
    } catch (error) {
      console.error("Register Error Details:", error); // Debugging log
      let message = "An error occurred";
      if (error.response) {
        if (error.response.status === 404) {
          message = "Registration service unreachable (404)";
        } else {
          message = error.response.data.message || error.message;
        }
      } else if (error.request) {
        message =
          "Server unreachable. Please check your internet or try again later.";
      } else {
        message = error.message;
      }
      return { success: false, message };
    }
  };

  const updateProfile = async (userData) => {
    try {
      const { data } = await api.put("/users/profile", userData);
      setUser(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      return { success: true, message: "Profile updated successfully" };
    } catch (error) {
      console.error("Update Profile Error Details:", error);
      let message = "An error occurred";
      if (error.response) {
        message = error.response.data.message || error.message;
      } else if (error.request) {
        message =
          "Server unreachable. Please check your internet or try again later.";
      } else {
        message = error.message;
      }
      return { success: false, message };
    }
  };

  const deleteAccount = async () => {
    try {
      await api.delete("/users/profile");
      logout(); // Clear state and redirect
      return { success: true, message: "Account deleted successfully" };
    } catch (error) {
      console.error("Delete Account Error:", error);
      let message = "An error occurred";
      if (error.response) {
        message = error.response.data.message || error.message;
      } else {
        message = error.message;
      }
      return { success: false, message };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  const addAddress = (newAddress) => {
    const address = { ...newAddress, id: Date.now() };
    if (address.isDefault || addresses.length === 0) {
      setAddresses((prev) =>
        prev.map((addr) => ({ ...addr, isDefault: false })),
      );
      address.isDefault = true;
    }
    setAddresses((prev) => [...prev, address]);
  };

  const editAddress = (id, updatedAddress) => {
    setAddresses((prev) => {
      // If setting as default, unset others
      const newAddresses = updatedAddress.isDefault
        ? prev.map((addr) => ({ ...addr, isDefault: false }))
        : [...prev];

      return newAddresses.map((addr) =>
        addr.id === id ? { ...updatedAddress, id } : addr,
      );
    });
  };

  const deleteAddress = (id) => {
    setAddresses((prev) => prev.filter((addr) => addr.id !== id));
  };

  const setDefaultAddress = (id) => {
    setAddresses((prev) =>
      prev.map((addr) => ({
        ...addr,
        isDefault: addr.id === id,
      })),
    );
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        updateProfile,
        deleteAccount,
        logout,
        addresses,
        addAddress,
        editAddress,
        deleteAddress,
        setDefaultAddress,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
