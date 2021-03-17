import React from "react";

import "./style.css";

export const RenderTime = ({ remainingTime }) => {
  if (remainingTime === 0) {
    return <div className="timer">Redo?</div>;
  }

  return (
    <div className="timer">
      <div className="value">
          {Math.floor(remainingTime / 60)}m {remainingTime - Math.floor(remainingTime / 60) * 60}s
      </div>
      <div className="text">Left</div>
    </div>
  );
};

