import React from "react";
import { LuFacebook, LuInstagram, LuTwitter } from "react-icons/lu";
import { NavLink } from "react-router-dom";
export default function StayConnected() {
  return (
    <section className="social-section">
      <div className="social-container container">
        <div className="social-header">
          <h2>Stay Connected</h2>
          <p>
            Follow Sliik & Co for the latest drops, exclusive deals, and
            behind-the-scenes style inspiration.
          </p>
        </div>
        <div className="social-links">
          <NavLink
            to="https://facebook.com/sliikandco"
            className="social-link"
            aria-label="Visit our Facebook page"
          >
            <LuFacebook />
          </NavLink>
          <NavLink
            to="https://twitter.com/sliikandco"
            className="social-link"
            aria-label="Visit our Twitter page"
          >
            <LuTwitter />
          </NavLink>
          <NavLink
            to="https://instagram.com/sliikandco"
            className="social-link"
            aria-label="Visit our Instagram page"
          >
            <LuInstagram />
          </NavLink>
        </div>
      </div>
    </section>
  );
}
