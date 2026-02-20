import React from "react";

function Button({
  children,
  type = "button",
  onClick,
  className,
  disabled = false,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`btn btn-primary rounded-xl ${className || ""}`}
    >
      {children}
    </button>
  );    
}

export default Button;