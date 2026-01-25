import React, { useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import Button from "../components/controls/Button";
import InputControl from "../components/controls/InputControl";

const API_URL = import.meta.env.VITE_API_URL;

const PASSWORD_RULES = [
  "At least 8 characters",
  "Include one uppercase letter",
  "Include one lowercase letter",
  "Include one number",
  "Include one special character (@$!%*?&)",
];

export default function NewPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    let valid = true;

    if (!passwordRegex.test(password)) {
      setPasswordError("Password does not meet requirements");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      valid = false;
    } else {
      setConfirmPasswordError("");
    }

    if (!valid) return;

    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/users/reset-password/${token}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (response.ok) {
        navigate("/login");
      } else {
        setPasswordError(data.message || "Failed to reset password");
      }
    } catch (error) {
      console.error("Error:", error);
      setPasswordError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-aligner">
        <div className="login">
          <div className="header-container">
            <h1>Create New Password</h1>
            <p>Enter your new password below.</p>
          </div>
          <form onSubmit={handleSubmit} autoComplete="off" noValidate>
            <InputControl
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError("");
              }}
              placeholder="New Password*"
              autoFocus={true}
              error={passwordError}
              errorDetails={passwordError ? PASSWORD_RULES : null}
              name="password"
            />

            <InputControl
              type="password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setConfirmPasswordError("");
              }}
              placeholder="Confirm Password*"
              error={confirmPasswordError}
              name="confirmPassword"
            />

            <div className="form-control">
              <Button
                text="Reset Password"
                type="submit"
                isLoading={isLoading}
              />
            </div>
          </form>
          <div className="auth-links">
            <NavLink to="/login">Back to Login</NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
