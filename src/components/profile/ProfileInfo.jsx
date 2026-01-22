import React, { useState, useEffect } from "react";
import Button from "../controls/Button.jsx";
import InputControl from "../controls/InputControl.jsx";
import { useAuth } from "../../context/AuthProvider.jsx";
import ConfirmationModal from "../common/ConfirmationModal.jsx";

export default function ProfileInfo() {
  const { user, updateProfile, deleteAccount } = useAuth();
  const [formData, setFormData] = useState({
    firstName: "",
    secondName: "",
    birthDate: "",
    phoneNumber: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    if (user) {
      const nameParts = user.name ? user.name.split(" ") : ["", ""];
      setFormData((prev) => ({
        ...prev,
        firstName: nameParts[0] || "",
        secondName: nameParts.slice(1).join(" ") || "",
        email: user.email || "",
        phoneNumber: user.phone || "",
        birthDate: user.birthDate ? user.birthDate.split("T")[0] : "",
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const payload = {
      name: `${formData.firstName} ${formData.secondName}`.trim(),
      email: formData.email,
    };

    if (formData.phoneNumber) payload.phone = formData.phoneNumber;
    if (formData.birthDate) payload.birthDate = formData.birthDate;

    // Only send password if it's not empty
    if (formData.password) {
      payload.password = formData.password;
    }

    const { success, message } = await updateProfile(payload);
    setMessage(message);

    // Clear password field after update for security
    if (success) {
      setFormData((prev) => ({ ...prev, password: "" }));
    }
  };
  const handleDeleteClick = (e) => {
    e.preventDefault();
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    const { success, message } = await deleteAccount();
    if (!success) {
      setMessage(message);
      setIsDeleteModalOpen(false);
    }
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
        {message && (
          <div
            className={
              message.includes("success") ? "success-msg" : "error-msg"
            }
          >
            {message}
          </div>
        )}
        <div className="section">
          <h3 className="section-title">Manage Account</h3>
          <Button
            onClick={handleDeleteClick}
            text="Delete Account"
            variant="secondary"
            className="delete-button"
            type="button"
            style={{
              backgroundColor: "#dc3545",
              color: "white",
              width: "auto",
            }}
          />
        </div>
      </form>
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Account"
        message="Are you sure you want to delete your account? This action cannot be undone."
      />
    </div>
  );
}
