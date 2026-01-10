import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthProvider";
import "./ShippingAddressSelector.css";
import { IoAdd } from "react-icons/io5";
// Note: I will need to create this CSS file or add styles to a parent CSS

export default function ShippingAddressSelector({ onAddressSelect, onAddNew }) {
  const { addresses } = useAuth();
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    // Auto-select default address on mount
    const defaultAddr = addresses.find((a) => a.isDefault);
    if (defaultAddr) {
      setSelectedId(defaultAddr.id);
      onAddressSelect(defaultAddr);
    } else if (addresses.length > 0) {
      // Fallback to first if no default
      setSelectedId(addresses[0].id);
      onAddressSelect(addresses[0]);
    }
  }, [addresses, onAddressSelect]);

  const handleSelect = (address) => {
    setSelectedId(address.id);
    onAddressSelect(address);
  };

  return (
    <div className="shipping-address-selector">
      <div className="saved-addresses-list">
        {addresses.map((addr) => (
          <div
            key={addr.id}
            className={`saved-address-item ${
              selectedId === addr.id ? "selected" : ""
            }`}
            onClick={() => handleSelect(addr)}
          >
            <div className="address-radio">
              <input
                type="radio"
                name="shippingAddress"
                checked={selectedId === addr.id}
                onChange={() => handleSelect(addr)}
              />
            </div>
            <div className="address-details">
              <span className="address-name">{addr.name}</span>
              <span className="address-line">
                {addr.street}, {addr.city}
              </span>
              <span className="address-line">
                {addr.country}, {addr.zip || addr.postalCode}
              </span>
              <span className="address-phone">{addr.phone}</span>
            </div>
            {addr.isDefault && <span className="default-tag">Default</span>}
          </div>
        ))}
        <div className="add-new-address-action">
          <div className="add-address-card" onClick={onAddNew}>
            <IoAdd className="add-icon" />
            <span className="add-text">Add Address</span>
          </div>
        </div>
      </div>
    </div>
  );
}
