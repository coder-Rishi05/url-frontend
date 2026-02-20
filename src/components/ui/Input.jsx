import React from "react";

function Input({
  label,
  type = "text",
  name,
  placeholder,
  value,
  onChange,
  required = false,
  error,
  className,
}) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label htmlFor={name} className="text-sm font-medium">
          {label}
        </label>
      )}

      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className={`input input-bordered w-full rounded-xl ${
          error ? "input-error" : ""
        } ${className || ""}`}
      />

      {error && <p className="text-sm text-error">{error}</p>}
    </div>
  );
}

export default Input;