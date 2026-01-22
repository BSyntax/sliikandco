import React from "react";
import "./Button.css";
import PropTypes from "prop-types";
import { ClipLoader } from "react-spinners";

export default function Button({
  text,
  onClick,
  variant = "primary",
  type = "button",
  className = "",
  isLoading = false,
  disabled = false,
}) {
  return (
    <button
      className={`button ${
        variant === "primary" ? "button-primary" : "button-secondary"
      } ${className}`}
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
    >
      {isLoading ? "Loading..." : text}
    </button>
  );
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(["primary", "secondary"]),
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  className: PropTypes.string,
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool,
};
