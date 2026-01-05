import React, { useState } from "react";
import Button from "../controls/Button.jsx";
import Input from "../controls/InputControl.jsx";

export default function Addresses() {
  const [isEditing, setIsEditing] = useState(false);

  const [address, setAddress] = useState({
    name: "Mateusz Wierzbicki",
    street: "ul. Przykładowa 123/45",
    city: "00-000 Warszawa",
    country: "Poland",
    phone: "+48 123 456 789",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // later: API call
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className="addresses-page">
      <div className="addresses-content">
        <div className="address-list">
          <div className="address-item">
            <form action="#">
              <div className="address-details login">
                {isEditing ? (
                  <>
                    <label htmlFor="name">Full name</label>
                    <Input
                      id="name"
                      name="name"
                      value={address.name}
                      onChange={handleChange}
                      placeholder="Full name"
                      autoFocus
                    />

                    <label htmlFor="street">Street address</label>
                    <Input
                      id="street"
                      name="street"
                      value={address.street}
                      onChange={handleChange}
                      placeholder="Street address"
                    />

                    <label htmlFor="city">City / Postal code</label>
                    <Input
                      id="city"
                      name="city"
                      value={address.city}
                      onChange={handleChange}
                      placeholder="City / Postal code"
                    />

                    <label htmlFor="country">Country</label>
                    <Input
                      id="country"
                      name="country"
                      value={address.country}
                      onChange={handleChange}
                      placeholder="Country"
                    />

                    <label htmlFor="phone">Phone number</label>
                    <Input
                      id="phone"
                      name="phone"
                      value={address.phone}
                      onChange={handleChange}
                      placeholder="Phone number"
                    />
                  </>
                ) : (
                  <>
                    <h4>{address.name}</h4>
                    <p>{address.street}</p>
                    <p>{address.city}</p>
                    <p>{address.country}</p>
                    <p>Phone: {address.phone}</p>
                  </>
                )}
              </div>
            </form>

            <div className="address-actions">
              {isEditing ? (
                <>
                  <button className="link-edit" onClick={handleSave}>
                    Save
                  </button>
                  <span className="separator">|</span>
                  <button className="link-delete" onClick={handleCancel}>
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="link-edit"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit
                  </button>
                  <span className="separator">|</span>
                  <button className="link-delete">Delete</button>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="add-address">
          <Button
            text="Add new address"
            variant="primary"
            className="add-address-button"
          />
        </div>
      </div>
    </div>
  );
}
