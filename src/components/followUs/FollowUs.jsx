import React from "react";
import { Link } from "react-router-dom";
import { LuFacebook, LuTwitter, LuInstagram } from "react-icons/lu";
import './FollowUs.css'

export default function FollowUs() {
  return (
    <div className="stay-connected container">
      <div className="stay-connected-content">
        <span className="stay-connected-caption">Follow Us</span>
        <Link to="/" className="stay-connected-logo">
          Sliik & Co.
        </Link>
        <p className="stay-connected-description">
          Stay connected with us on social media for the latest updates,
          exclusive offers, and style inspiration. Join our community and be the
          first to know about new arrivals and special events.
        </p>
      </div>

      <div className="stay-connected-icons">
        <span className="stay-connected-icon">
          <Link
            to="https://facebook.com/sliikandco"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <LuFacebook />
          </Link>
        </span>
        <span className="stay-connected-icon">
          <Link
            to="https://twitter.com/sliikandco"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
          >
            <LuTwitter />
          </Link>
        </span>
        <span className="stay-connected-icon">
          <Link
            to="https://instagram.com/sliikandco"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <LuInstagram />
          </Link>
        </span>
      </div>
    </div>
  );
}
