import React from "react";
import PropTypes from "prop-types";

export default function Button({
  text,
  onClick,
  variant = "primary",
  type = "button",
}) {
  return (
    <button
      className={`button ${
        variant === "primary" ? "button-primary" : "button-secondary"
      }`}
      type={type}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(["primary", "secondary"]),
  type: PropTypes.oneOf(["button", "submit", "reset"]),
};
