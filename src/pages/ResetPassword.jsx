import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Button from "../components/controls/Button";
import InputControl from "../components/controls/InputControl";

const API_URL = import.meta.env.VITE_API_URL;

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setEmailError("Invalid email format");
      return;
    }

    setEmailError("");
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/users/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setEmailSent(true);
      } else {
        setEmailError(data.message || "Failed to send reset email");
      }
    } catch (error) {
      console.error("Error:", error);
      setEmailError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (emailSent) {
    return (
      <div className="login-container">
        <div className="login-aligner">
          <div className="login">
            <div className="header-container">
              <h1>Check Your Email</h1>
              <p>
                We've sent a password reset link to <strong>{email}</strong>
              </p>
              <p style={{ marginTop: "20px", fontSize: "14px", color: "#666" }}>
                The link will expire in 10 minutes. If you don't see the email,
                check your spam folder.
              </p>
            </div>
            <div className="auth-links">
              <NavLink to="/login">Back to Login</NavLink>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="login-container">
      <div className="login-aligner">
        <div className="login">
          <div className="header-container">
            <h1>Reset your Password</h1>
            <p>Enter your email to get a reset link.</p>
          </div>
          <form onSubmit={handleSubmit} autoComplete="off" noValidate>
            <InputControl
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError("");
              }}
              placeholder="Email*"
              autoFocus={true}
              error={emailError}
              name="email"
            />
            <div className="form-control">
              <Button
                text="Send Reset Link"
                type="submit"
                isLoading={isLoading}
              />
            </div>
          </form>
          <div className="auth-links">
            <NavLink to="/login">Cancel</NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
