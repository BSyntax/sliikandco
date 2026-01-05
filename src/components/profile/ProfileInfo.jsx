import React, { useState } from "react";
import Button from "../controls/Button.jsx";
import InputControl from "../controls/InputControl.jsx";

export default function ProfileInfo() {
  const [formData, setFormData] = useState({
    firstName: "Mateusz",
    secondName: "Wierzbicki",
    birthDate: "",
    phoneNumber: "+27 123456789",
    email: "email@example.pl",
    password: "password123",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Saved data:", formData);
  };

  return (
    <div className="profile-info login">
      <form onSubmit={handleSubmit}>
        <div className="section">
          <div className="fullname-controls">
            <div className="input-group half">
              <label htmlFor="firstName">First Name</label>
              <InputControl
                id="firstName"
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First name"
              />
            </div>

            <div className="input-group half">
              <label htmlFor="secondName">Second Name</label>
              <InputControl
                id="secondName"
                name="secondName"
                type="text"
                value={formData.secondName}
                onChange={handleChange}
                placeholder="Second name"
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="birthDate">Birth Date</label>
            <InputControl
              id="birthDate"
              name="birthDate"
              type="date"
              value={formData.birthDate}
              onChange={handleChange}
              placeholder="dd/mm/yyyy"
            />
          </div>

          <div className="input-group">
            <label htmlFor="phoneNumber">Phone Number</label>
            <InputControl
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Phone number"
            />
            <small>Keep 9-digit format with no spaces and dashes.</small>
          </div>
        </div>

        <div className="section">
          <h3 className="section-title"> Login Details</h3>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <InputControl
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="E-mail address"
            />
            <small>
              Assertively utilize adaptive customer service for future-proof
              platforms. Completely drive optimal markets.
            </small>
          </div>
          <div className="input-group password-group">
            <label htmlFor="password">Password</label>
            <InputControl
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
            />
          </div>
        </div>

        <div className="actions">
          <Button
            text="Save"
            variant="primary"
            className="save-button"
            type="submit"
          />
        </div>

        <div className="section">
          <h3 className="section-title">Manage Account</h3>
          <Button
            text="Delete Account"
            variant="secondary"
            className="delete-button"
            type="submit"
          />
        </div>
      </form>
    </div>
  );
}
