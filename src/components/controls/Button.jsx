import React from "react";
import PropTypes from "prop-types";

export default function Button({ text, action, type }) {
  return (
    <button
      className="button"
      type={type}
      onClick={action ? () => action() : undefined}
    >
      {text}
    </button>
  );
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  action: PropTypes.func, 
  type: PropTypes.string.isRequired,
};
