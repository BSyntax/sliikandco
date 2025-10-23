import React from "react";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../navigation/Nav";
import Button from "../controls/Button";
import Footer from "../footer/Footer";
import TopButton from "../controls/TopButton";

export default function Login() {
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setemail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="login-container">
      <Nav />
      <div className="login-aligner">
        <div className="login">
          <h1>Login</h1>
          <form>
            <div className="form-control">
              <input
                type="email"
                onChange={handleEmailChange}
                placeholder="Email"
                value={email}
              />
            </div>
            <div className="form-control">
              <input
                type="password"
                onChange={handlePasswordChange}
                placeholder="Password"
                value={password}
              />
            </div>
            <div className="form-control">
              <Button text="Login" action={() => navigate("/")} type="submit" />
            </div>
          </form>
          <div className="auth-links">
            <NavLink to="/register">
              Don't have an account? <span>Sign up</span>
            </NavLink>
            <NavLink to="/forgot-password">Reset Password</NavLink>
          </div>
        </div>
      </div>
      <Footer />
      <TopButton />
    </div>
  );
}
