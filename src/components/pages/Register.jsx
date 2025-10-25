import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Nav from "../navigation/Nav";
import Button from "../controls/Button";
import Footer from "../footer/Footer";
import TopButton from "../controls/TopButton";
import { LuEye, LuEyeOff } from "react-icons/lu";

export default function Register() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
    setFirstNameError("");
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
    setLastNameError("");
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError("");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate first name
    if (!firstName.trim()) {
      setFirstNameError("First name is required");
      return;
    }
    setFirstNameError("");

    // Validate last name
    if (!lastName.trim()) {
      setLastNameError("Last name is required");
      return;
    }
    setLastNameError("");

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Invalid email format");
      return;
    }
    setEmailError("");

    // Validate password
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError("Password does not meet requirements");
      return;
    }
    setPasswordError("");

    // Simulate API call
    console.log("Registering:", { firstName, lastName, email, password });
    navigate("/login"); // Navigate to login after successful registration
  };

  return (
    <div className="login-container">
      <Nav />
      <div className="login-aligner">
        <div className="login">
          <div className="header-container">
            <h1>Register</h1>
            <p>Create your account to get started.</p>
          </div>
          <form onSubmit={handleSubmit} autoComplete="off" noValidate>
            <div className="form-control">
              <div className="input-wrapper">
                <input
                  type="text"
                  onChange={handleFirstNameChange}
                  placeholder="First Name*"
                  value={firstName}
                  autoFocus
                  aria-invalid={!!firstNameError}
                  aria-describedby={firstNameError ? "first-name-error" : undefined}
                />
              </div>
              {firstNameError && <p className="error" id="first-name-error">{firstNameError}</p>}
            </div>
            <div className="form-control">
              <div className="input-wrapper">
                <input
                  type="text"
                  onChange={handleLastNameChange}
                  placeholder="Last Name*"
                  value={lastName}
                  aria-invalid={!!lastNameError}
                  aria-describedby={lastNameError ? "last-name-error" : undefined}
                />
              </div>
              {lastNameError && <p className="error" id="last-name-error">{lastNameError}</p>}
            </div>
            <div className="form-control">
              <div className="input-wrapper">
                <input
                  type="email"
                  onChange={handleEmailChange}
                  placeholder="Email*"
                  value={email}
                  aria-invalid={!!emailError}
                  aria-describedby={emailError ? "email-error" : undefined}
                />
              </div>
              {emailError && <p className="error" id="email-error">{emailError}</p>}
            </div>
            <div className="form-control password-container">
              <div className="input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  onChange={handlePasswordChange}
                  placeholder="Password*"
                  value={password}
                  aria-invalid={!!passwordError}
                  aria-describedby={passwordError ? "password-error" : undefined}
                />
                <div className="password-toggle">
                  {showPassword ? (
                    <LuEyeOff onClick={togglePasswordVisibility} />
                  ) : (
                    <LuEye onClick={togglePasswordVisibility} />
                  )}
                </div>
              </div>
              {passwordError && (
                <div className="error-container" id="password-error">
                  <p className="error">{passwordError}</p>
                  <ul className="error-details">
                    <li>At least 8 characters</li>
                    <li>Include one uppercase letter</li>
                    <li>Include one lowercase letter</li>
                    <li>Include one number</li>
                    <li>Include one special character (@$!%*?&)</li>
                  </ul>
                </div>
              )}
            </div>
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
      <Footer />
      <TopButton />
    </div>
  );
}