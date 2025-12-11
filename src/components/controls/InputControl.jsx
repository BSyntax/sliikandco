import React, { useState } from "react";
import PropTypes from "prop-types";
import { LuEye, LuEyeOff } from "react-icons/lu";

const Input = ({
  type = "text",
  value,
  onChange,
  placeholder,
  autoFocus = false,
  error,
  errorDetails,
  name,
  id,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <div className={`form-control ${isPassword ? "password-container" : ""}`}>
      <div className="input-wrapper">
        <input
          id={id}
          name={name}
          type={isPassword ? (showPassword ? "text" : "password") : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className="input-field"
        />

        {isPassword && (
          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <LuEyeOff /> : <LuEye />}
          </button>
        )}
      </div>

      {error && <p className="error">{error}</p>}

      {errorDetails && (
        <ul className="error-details">
          {errorDetails.map((detail, index) => (
            <li key={index}>{detail}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

Input.propTypes = {
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  autoFocus: PropTypes.bool,
  error: PropTypes.string,
  errorDetails: PropTypes.arrayOf(PropTypes.string),
  name: PropTypes.string,
  id: PropTypes.string,
};

export default Input;
