import React from "react";

function Spinner({ fullScreen = false, size = "lg" }) {
  const sizeClasses = {
    sm: "loading-sm",
    md: "loading-md",
    lg: "loading-lg",
  };

  const spinner = (
    <span className={`loading loading-spinner ${sizeClasses[size]}`}></span>
  );

  if (fullScreen) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        {spinner}
      </div>
    );
  }

  return <div className="flex items-center justify-center py-6">{spinner}</div>;
}

export default Spinner;
