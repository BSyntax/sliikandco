import React, { useState } from "react";
import ContactImage from "../assets/images/contact-store.webp";
import BreadCrumb from "../components/wishitem/BreadCrumb";
import Button from "../components/controls/Button";
import { useNavigate } from "react-router-dom";
import StayConnected from "../components/stayConnected/StayConnected";
import NewsletterSignup from "../components/newsletter/NewsletterSignup";
import LookbookGallery from "../components/lookbookGallery/LookbookGallery";

export default function Contact() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const [fullNameError, setFullNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [messageError, setMessageError] = useState("");

  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
    setFullNameError("");
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
    setPhoneError("");
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
    setMessageError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!fullName.trim()) {
      setFullNameError("Full name is required");
      return;
    }
    setFullNameError("");

    if (!/^\+?\d{7,15}$/.test(phone.trim())) {
      setPhoneError("Please enter a valid phone number");
      return;
    }
    setPhoneError("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setEmailError("Invalid email format");
      return;
    }
    setEmailError("");

    if (!message.trim()) {
      setMessageError("Message is required");
      return;
    }
    setMessageError("");

    navigate("/");
  };

  return (
    <>
      <BreadCrumb from="Home" current="Contact" />

      <div className="contact">
        <div className="contact-wrapper container">
          <div className="image-container">
            <img src={ContactImage} alt="Contact Sliik & Co." />
          </div>

          <div className="form-container login">
            <h1>Contact Us</h1>
            <p>
              Have questions or need help? Reach out and our team will get back
              to you shortly.
            </p>

            <div className="contact-form">
              <form onSubmit={handleSubmit} noValidate>
                <div className="form-control">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={fullName}
                    onChange={handleFullNameChange}
                    placeholder="Enter your full name"
                    aria-invalid={!!fullNameError}
                    aria-describedby={
                      fullNameError ? "full-name-error" : undefined
                    }
                  />
                  {fullNameError && (
                    <p className="error" id="full-name-error">
                      {fullNameError}
                    </p>
                  )}
                </div>

                <div className="form-control">
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={phone}
                    placeholder="Enter your phone number"
                    onChange={handlePhoneChange}
                    aria-invalid={!!phoneError}
                    aria-describedby={phoneError ? "phone-error" : undefined}
                  />
                  {phoneError && (
                    <p className="error" id="phone-error">
                      {phoneError}
                    </p>
                  )}
                </div>

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

                <div className="form-control">
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    onChange={handleMessageChange}
                    placeholder="Enter your message here..."
                    value={message}
                    aria-invalid={!!messageError}
                    aria-describedby={
                      messageError ? "message-error" : undefined
                    }
                  ></textarea>
                  {messageError && (
                    <p className="error" id="message-error">
                      {messageError}
                    </p>
                  )}
                </div>

                <Button text="Submit" type="submit" />
              </form>
            </div>
          </div>
        </div>
        <StayConnected />
        <NewsletterSignup />
        <LookbookGallery />
      </div>
    </>
  );
}
