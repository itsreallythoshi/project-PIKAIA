import React from "react";
import "./backgroundOne.css";
import Top__waves from "./../../assets/backgroundAssets/Top Waves.svg";
import Bottom__waves from "./../../assets/backgroundAssets/Bottom Waves.svg";

function BackgroundOne() {
  return (
    <div className="bgOne">
      <img src={Top__waves} alt="" className="bgOne__topWaves" />
      {/* eslint-disable-next-line */}
      <img src={Bottom__waves} alt="" className="bgOne__bottomWaves" alt="" />
    </div>
  );
}

export default BackgroundOne;
