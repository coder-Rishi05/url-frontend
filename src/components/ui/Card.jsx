import React from "react";

const Card = ({ children, className = "" }) => {
  const baseStyles =
    "bg-base-200 shadow-xl rounded-2xl p-6 border border-base-300 transition-all duration-200";

  return (
    <div className={`${baseStyles} ${className}`}>
      {children}
    </div>
  );
};

export default Card;