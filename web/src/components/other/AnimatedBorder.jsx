import React from "react";
import "./AnimatedBorder.css";

const AnimatedBorder = ({ children }) => {
  return (
    <div className="container">
      <div className="background-img">
        <div className="box">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AnimatedBorder;
