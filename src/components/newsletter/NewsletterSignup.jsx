import { useState } from "react";
import "./NewsletterSignup.css";
import Button from "../controls/Button";
import { useNavigate } from "react-router-dom";

export default function NewsletterSignup() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    setEmailError("");
    navigate("/");
  };

  return (
    <div className="newsletter">
      <div className="container">
        <h3>Join Our Newsletter</h3>
        <p>Join our list for exclusive updates and inspiration.</p>
        <div className="newsletter-form login">
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Enter your email"
                aria-invalid={!!emailError}
                aria-describedby={emailError ? "email-error" : undefined}
              />
              {emailError && (
                <p className="error" id="email-error">
                  {emailError}
                </p>
              )}
            </div>
            <Button text="Subscribe" type="submit" />
          </form>
        </div>
      </div>
    </div>
  );
}
