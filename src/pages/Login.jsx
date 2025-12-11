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

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    let valid = true;

    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      valid = false;
      return;
    } else {
      setEmailError("");
    }

    if (!passwordRegex.test(password)) {
      setPasswordError("Password does not meet requirements");
      valid = false;
      return;
    } else {
      setPasswordError("");
    }

    if (valid) {
      navigate("/");
    }
  };

  return (
    <div className="login-container">
      <div className="login-aligner">
        <div className="login">
          <h1>Login</h1>
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
              <Button text="Login" type="submit" />
            </div>
          </form>

          <div className="auth-links">
            <NavLink to="/register">
              Don't have an account? <span>Sign up</span>
            </NavLink>
            <NavLink to="/reset-password">Reset Password</NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
