import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "../components/controls/Button";
import InputControl from "../components/controls/InputControl";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const navigate = useNavigate();

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
              <Button text="Submit" type="submit" />
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
