import React from "react";
import Home from "./Assets/Home Button.svg";
import "./Footer.css";

function Footer() {
  return (
    <div className="footer">
      <div className="footer__homeBtn">
        <img src={Home} alt="" />
      </div>
      {/* <img className="footer__root" src={footer} alt="" /> */}
    </div>
  );
}

export default Footer;
