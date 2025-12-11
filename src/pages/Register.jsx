import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "../components/controls/Button";
import InputControl from "../components/controls/InputControl";

const PASSWORD_RULES = [
  "At least 8 characters",
  "Include one uppercase letter",
  "Include one lowercase letter",
  "Include one number",
  "Include one special character (@$!%*?&)",
];

export default function Register() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = (e) => {
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

    console.log("Registering:", { firstName, lastName, email, password });
    navigate("/login");
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
              <Button text="Create Account" type="submit" />
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
