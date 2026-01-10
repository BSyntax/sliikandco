import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "Mateusz Wierzbicki",
    email: "test@example.com",
  });

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

  const login = (userData) => {
    setUser(userData);
    setAddresses(addresses);
    navigate("/profile");
  };

  const logout = () => {
    setUser(null);
    // setAddresses([]);
    navigate("/");
  };

  const addAddress = (newAddress) => {
    const address = { ...newAddress, id: Date.now() };
    if (address.isDefault || addresses.length === 0) {
      setAddresses((prev) =>
        prev.map((addr) => ({ ...addr, isDefault: false }))
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
        addr.id === id ? { ...updatedAddress, id } : addr
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
      }))
    );
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        addresses,
        addAddress,
        editAddress,
        deleteAddress,
        setDefaultAddress,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
