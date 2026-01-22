import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "../components/controls/Button";
import InputControl from "../components/controls/InputControl";
import { useAuth } from "../context/AuthProvider";

const PASSWORD_RULES = [
  "At least 8 characters",
  "Include one uppercase letter",
  "Include one lowercase letter",
  "Include one number",
  "Include one special character (@$!%*?&)",
];

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setFirstNameError("");
    setLastNameError("");
    setEmailError("");
    setPasswordError("");

    if (!firstName.trim()) {
      setFirstNameError("First name is required");
      return;
    }

    if (!lastName.trim()) {
      setLastNameError("Last name is required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Invalid email format");
      return;
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError("Password does not meet requirements");
      return;
    }

    setIsLoading(true);
    // Wait for minimum 1.5s for UX
    const [result] = await Promise.all([
      register(`${firstName} ${lastName}`, email, password),
      new Promise((resolve) => setTimeout(resolve, 1500)),
    ]);

    const { success, message } = result;

    if (!success) {
      setEmailError(message); // Or handle general error
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-aligner">
        <div className="login">
          <div className="header-container">
            <h1>Register</h1>
            <p>Create your account to get started.</p>
          </div>
          <form onSubmit={handleSubmit} autoComplete="off" noValidate>
            <InputControl
              type="text"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
                setFirstNameError("");
              }}
              placeholder="First Name*"
              autoFocus={true}
              error={firstNameError}
              name="firstName"
            />

            <InputControl
              type="text"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
                setLastNameError("");
              }}
              placeholder="Last Name*"
              error={lastNameError}
              name="lastName"
            />

            <InputControl
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError("");
              }}
              placeholder="Email*"
              error={emailError}
              name="email"
            />

            <InputControl
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError("");
              }}
              placeholder="Password*"
              error={passwordError}
              errorDetails={passwordError ? PASSWORD_RULES : null}
              name="password"
            />

            <div className="form-control">
              <Button
                text="Create Account"
                type="submit"
                isLoading={isLoading}
              />
            </div>
          </form>
          <div className="auth-links">
            <NavLink to="/login">
              Already have an account? <span>Sign in</span>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
