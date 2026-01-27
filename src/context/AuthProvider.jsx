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
    try {
      const userInfo = localStorage.getItem("userInfo");
      if (userInfo) {
        setUser(JSON.parse(userInfo));
      }
    } catch (error) {
      console.error("Failed to parse user info from localStorage:", error);
      localStorage.removeItem("userInfo");
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const { data } = await api.post("/users/login", { email, password });
      setUser(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      // navigate("/profile"); // Handled in Login component
      return { success: true };
    } catch (error) {
      console.error("Login Error Details:", error);
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
      console.error("Register Error Details:", error);
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
      logout();
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
    // Use setTimeout to ensure state update processes before navigation if needed,
    // though usually state update is enough.
    // Ensuring navigation happens after local storage clear.
    setTimeout(() => {
      navigate("/");
    }, 0);
  };

  const addresses = user?.addresses || [];

  const addAddress = async (newAddress) => {
    let updatedAddresses = [...addresses];

    if (newAddress.isDefault || addresses.length === 0) {
      updatedAddresses = updatedAddresses.map((addr) => ({
        ...addr,
        isDefault: false,
      }));
      newAddress.isDefault = true;
    }

    updatedAddresses.push(newAddress);
    await updateProfile({ addresses: updatedAddresses });
  };

  const editAddress = async (id, updatedAddress) => {
    let updatedAddresses = addresses.map((addr) =>
      addr._id === id || addr.id === id ? { ...updatedAddress, _id: id } : addr,
    );

    if (updatedAddress.isDefault) {
      updatedAddresses = updatedAddresses.map((addr) => ({
        ...addr,
        isDefault: addr._id === id || addr.id === id,
      }));
    }

    await updateProfile({ addresses: updatedAddresses });
  };

  const deleteAddress = async (id) => {
    const updatedAddresses = addresses.filter(
      (addr) => addr._id !== id && addr.id !== id,
    );
    await updateProfile({ addresses: updatedAddresses });
  };

  const setDefaultAddress = async (id) => {
    const updatedAddresses = addresses.map((addr) => ({
      ...addr,
      isDefault: addr._id === id || addr.id === id,
    }));
    await updateProfile({ addresses: updatedAddresses });
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
