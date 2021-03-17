import React from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { RenderTime } from "./RenderTime";
import "./style.css";

const CountdownAnimation = ({
  key = 1,
  timer = 20,
  animate = true,
  children,
}) => {
  return (
    <div className="dashboard__timer__countdown">
      <CountdownCircleTimer
        key={key}
        isPlaying={animate}
        duration={timer * 60}
        colors={[["#fff", 0.33], ["#fff", 0.33], ["#fff"]]}
        strokeWidth={9}
        size={175}
        rotation="counterclockwise"
        trailColor="rgba(105, 130, 194, 0.403)"
        onComplete={() => [true, 1000]}
      >
        {RenderTime}
      </CountdownCircleTimer>
    </div>
  );
};

export default CountdownAnimation;
