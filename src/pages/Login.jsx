import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Nav from "../components/navigation/Nav";
import Button from "../components/controls/Button";
import Footer from "../components/footer/Footer";
import TopButton from "../components/controls/TopButton";
import { LuEye, LuEyeOff } from "react-icons/lu";


export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!emailRegex.test(email)) {
      setEmailError("Invalid email format");
      return;
    }
    setEmailError("");

    if (!passwordRegex.test(password)) {
      setPasswordError("Password does not meet requirements");
      return;
    }
    setPasswordError("");

    navigate("/");
  };

  return (
    <div className="login-container">
      <Nav />
      <div className="login-aligner">
        <div className="login">
          <h1>Login</h1>
          <form onSubmit={handleSubmit} autoComplete="off" noValidate>
            <div className="form-control">
              <div className="input-wrapper">
                <input
                  type="email"
                  onChange={handleEmailChange}
                  placeholder="Email*"
                  value={email}
                  autoFocus
                />
              </div>
              {emailError && <p className="error">{emailError}</p>}
            </div>
            <div className="form-control password-container">
              <div className="input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  onChange={handlePasswordChange}
                  placeholder="Password*"
                  value={password}
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
                <div className="error-container">
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
      <Footer />
      <TopButton />
    </div>
  );
}
