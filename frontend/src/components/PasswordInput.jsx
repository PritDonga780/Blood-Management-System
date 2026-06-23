import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function PasswordInput({
  value,
  onChange,
  placeholder,
  name,
}) {
  const [showPassword, setShowPassword] =
    useState(false);

  return (
    <div className="input-group mb-3">
      <input
        type={showPassword ? "text" : "password"}
        className="form-control"
        placeholder={placeholder}
        value={value}
        name={name}
        onChange={onChange}
      />

      <button
        type="button"
        className="btn btn-outline-secondary"
        onClick={() =>
          setShowPassword(!showPassword)
        }
      >
        {showPassword ? (
          <FaEyeSlash />
        ) : (
          <FaEye />
        )}
      </button>
    </div>
  );
}

export default PasswordInput;