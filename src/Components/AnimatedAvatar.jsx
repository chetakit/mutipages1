import React from "react";
import "./AnimatedAvatar.css";

const AnimatedAvatar = ({ mood }) => {
  return (
    <div className={`avatar-wrapper ${mood}`}>
      <div className="avatar-glow"></div>
      <div className="avatar-core">
        <div className="eyes left"></div>
        <div className="eyes right"></div>
        <div className="mouth"></div>
      </div>
    </div>
  );
};

export default AnimatedAvatar;
