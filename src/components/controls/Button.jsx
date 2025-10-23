import React from "react";
import propTypes from "prop-types";

export default function Button({ text, action, type }) {
  return (
    <button className="button" type={type} onClick={() => action()}>
      {text}
    </button>
  );
}

Button.prototype = {
  text: propTypes.string.isRequired,
  action: propTypes.func.isRequired,
  type: propTypes.string.isRequired,
};
