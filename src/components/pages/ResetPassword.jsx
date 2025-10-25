import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Nav from "../navigation/Nav";
import Button from "../controls/Button";
import Footer from "../footer/Footer";
import TopButton from "../controls/TopButton";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Invalid email format");
      return;
    }
    setEmailError("");
    console.log("Reset email sent to:", email);
    navigate("/login");
  };

  return (
    <div className="login-container">
      <Nav />
      <div className="login-aligner">
        <div className="login">
          <div className="header-container">
            <h1>Reset your Password</h1>
            <p>Enter your email to get a reset link.</p>
          </div>
          <form onSubmit={handleSubmit} autoComplete="off" noValidate>
            <div className="form-control">
              <div className="input-wrapper">
                <input
                  type="email"
                  onChange={handleEmailChange}
                  placeholder="Email*"
                  value={email}
                  autoFocus
                  aria-invalid={!!emailError}
                  aria-describedby={emailError ? "email-error" : undefined}
                />
              </div>
              {emailError && (
                <p className="error" id="email-error">
                  {emailError}
                </p>
              )}
            </div>
            <div className="form-control">
              <Button text="Submit" type="submit" />
            </div>
          </form>
          <div className="auth-links">
            <NavLink to="/login">Cancel</NavLink>
          </div>
        </div>
      </div>
      <Footer />
      <TopButton />
    </div>
  );
}
