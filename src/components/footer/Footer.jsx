import React from "react";
import "./Footer.css";
import { NavLink } from "react-router-dom";
import { LuFacebook, LuInstagram, LuTwitter } from "react-icons/lu";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-wrapper">
      <div className="content-aligner container">
        <ul className="footer-links">
          <li>
            <div className="section-block">
              <h3 className="section-title">Shop</h3>
              <ul>
                <li className="section-link">
                  <NavLink to="/shop/men/tops">Men's Tops</NavLink>
                </li>
                <li className="section-link">
                  <NavLink to="/shop/women/dresses">Women's Dresses</NavLink>
                </li>
                <li className="section-link">
                  <NavLink to="/collection/new-arrivals">New Arrivals</NavLink>
                </li>
                <li className="section-link">
                  <NavLink to="/shop">Shop All</NavLink>
                </li>
              </ul>
            </div>
          </li>
          <li>
            <div className="section-block">
              <h3 className="section-title">Information</h3>
              <ul>
                <li className="section-link">
                  <NavLink to="/faq">FAQ</NavLink>
                </li>
                <li className="section-link">
                  <NavLink to="/shipping">Shipping & Returns</NavLink>
                </li>
                <li className="section-link">
                  <NavLink to="/size-guide">Size Guide</NavLink>
                </li>
                <li className="section-link">
                  <NavLink to="/terms">Terms & Conditions</NavLink>
                </li>
              </ul>
            </div>
          </li>
          <li>
            <div className="section-block">
              <h3 className="section-title">About</h3>
              <ul>
                <li className="section-link">
                  <NavLink to="/about/our-story">Our Story</NavLink>
                </li>
                <li className="section-link">
                  <NavLink to="/about/mission">Our Mission</NavLink>
                </li>
                <li className="section-link">
                  <NavLink to="/about/sustainability">Sustainability</NavLink>
                </li>
              </ul>
            </div>
          </li>
          <li>
            <div className="section-block">
              <h3>Contact</h3>
              <ul>
                <li className="section-link">
                  <NavLink to="/contact/support">Customer Support</NavLink>
                </li>
                <li className="section-link">
                  <NavLink to="/contact/collaborations">Collaborations</NavLink>
                </li>
                <li className="section-link">
                  <NavLink to="/contact/feedback">Feedback</NavLink>
                </li>
              </ul>
            </div>
          </li>
        </ul>
        <div className="brand-info">
          <div className="company-logo">
            <NavLink to="/" className="logo-link">
              Sliik & Co.
            </NavLink>
          </div>
          <div className="company-info">
            <p>
              Sliik & Co. brings bold, modern fashion to women and men who dare
              to stand out. Our curated collections blend sleek designs with
              timeless style, offering high-quality clothing for every occasion.
            </p>
          </div>
        </div>
        <div className="footer-base">
          <span>copyright {currentYear}&copy; Sliik & Co.</span>
          <div className="social-icons">
            <NavLink
              to="https://facebook.com/sliikandco"
              className="social-icon"
            >
              <LuFacebook />
            </NavLink>
            <NavLink
              to="https://twitter.com/sliikandco"
              className="social-icon"
            >
              <LuTwitter />
            </NavLink>
            <NavLink
              to="https://instagram.com/sliikandco"
              className="social-icon"
            >
              <LuInstagram />
            </NavLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
