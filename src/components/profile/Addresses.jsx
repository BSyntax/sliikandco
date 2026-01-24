import React, { useState } from "react";
import Button from "../controls/Button.jsx";
import Input from "../controls/InputControl.jsx";
import "./Addresses.css";
import { IoAdd } from "react-icons/io5";

import { useAuth } from "../../context/AuthProvider";

const AddressForm = ({
  isAdding,
  formData,
  handleChange,
  handleSave,
  handleCancel,
}) => (
  <div className="address-card address-form-card">
    <form onSubmit={handleSave} className="address-form">
      <h3>{isAdding ? "Add a new address" : "Edit address"}</h3>

      <div className="form-group login">
        <label htmlFor="country">Country/Region</label>
        <Input
          id="country"
          name="country"
          value={formData.country}
          onChange={handleChange}
          placeholder="Country"
          required
        />
      </div>

      <div className="form-group login">
        <label htmlFor="name">Full name (First and Last name)</label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Full name"
          required
        />
      </div>

      <div className="form-group login">
        <label htmlFor="phone">Phone number</label>
        <Input
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone number"
        />
      </div>

      <div className="form-group login">
        <label htmlFor="street">Street address</label>
        <Input
          id="street"
          name="street"
          value={formData.street}
          onChange={handleChange}
          placeholder="Street address, P.O. box, company name, c/o"
          required
        />
      </div>

      <div className="form-group login">
        <label htmlFor="city">City</label>
        <Input
          id="city"
          name="city"
          value={formData.city}
          onChange={handleChange}
          placeholder="City"
          required
        />
      </div>

      <div className="form-group login">
        <label htmlFor="postalCode">ZIP / Postal code</label>
        <Input
          id="postalCode"
          name="postalCode"
          value={formData.postalCode}
          onChange={handleChange}
          placeholder="ZIP / Postal code"
          required
        />
      </div>

      <div className="form-actions">
        <Button text="Save Address" variant="primary" type="submit" />
        <Button
          text="Cancel"
          variant="secondary"
          onClick={handleCancel}
          type="button"
        />
      </div>
    </form>
  </div>
);

export default function Addresses() {
  const {
    addresses,
    addAddress,
    editAddress,
    deleteAddress,
    setDefaultAddress,
  } = useAuth();

  const [editingId, setEditingId] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    street: "",
    city: "",
    postalCode: "",
    country: "",
    phone: "",
    isDefault: false,
  });

  const handleEdit = (address) => {
    setFormData(address);
    setEditingId(address.id);
    setIsAdding(false);
  };

  const handleAdd = () => {
    setFormData({
      name: "",
      street: "",
      city: "",
      postalCode: "",
      country: "",
      phone: "",
      isDefault: addresses.length === 0,
    });
    setIsAdding(true);
    setEditingId(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (isAdding) {
      addAddress(formData);
      setIsAdding(false);
    } else {
      editAddress(editingId, formData);
      setEditingId(null);
    }
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
  };

  const handleRemove = (id) => {
    deleteAddress(id);
  };

  const handleSetDefault = (id) => {
    setDefaultAddress(id);
  };

  return (
    <div className="addresses-page">
      <div className="addresses-grid">
        {isAdding ? (
          <AddressForm
            isAdding={isAdding}
            formData={formData}
            handleChange={handleChange}
            handleSave={handleSave}
            handleCancel={handleCancel}
          />
        ) : (
          <div className="add-address-card" onClick={handleAdd}>
            <IoAdd className="add-icon" />
            <span className="add-text">Add Address</span>
          </div>
        )}

        {addresses.map((addr) =>
          editingId === addr.id ? (
            <AddressForm
              key={addr.id}
              isAdding={false}
              formData={formData}
              handleChange={handleChange}
              handleSave={handleSave}
              handleCancel={handleCancel}
            />
          ) : (
            <div
              key={addr.id}
              className={`address-card ${addr.isDefault ? "default" : ""}`}
            >
              {addr.isDefault && <div className="default-badge">Default</div>}

              <div className="address-content">
                <h4>{addr.name}</h4>
                <p>{addr.street}</p>
                <p>
                  {addr.city}, {addr.postalCode}
                </p>
                <p>{addr.country}</p>
                <p>Phone: {addr.phone}</p>
              </div>

              <div className="address-actions">
                <div className="actions-row">
                  <button
                    className="action-link"
                    onClick={() => handleEdit(addr)}
                  >
                    Edit
                  </button>
                  <span className="separator">|</span>
                  <button
                    className="action-link"
                    onClick={() => handleRemove(addr.id)}
                  >
                    Remove
                  </button>
                </div>
                {!addr.isDefault && (
                  <button
                    className="action-link set-default-btn"
                    onClick={() => handleSetDefault(addr.id)}
                  >
                    Set as Default
                  </button>
                )}
              </div>
            </div>
          ),
        )}
      </div>
    </div>
  );
}
