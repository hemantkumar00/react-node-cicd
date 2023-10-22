import React from "react";
// import "./LoadingSpinner.css"; // Import the CSS file with the animation styles

const LoadingSpinner = () => {
  return (
    <div className="loading-spinner-container">
      <div className="loading-spinner"></div>
      <div className="loading-text">
        Loading<span className="dot1">.</span>
        <span className="dot2">.</span>
        <span className="dot3">.</span>
      </div>
    </div>
  );
};

export default LoadingSpinner;
