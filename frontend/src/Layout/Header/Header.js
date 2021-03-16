import React from "react";
import "./header.css";
import Portrait from "./assets/Avatar.jpg";
import { Avatar, Button } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const Header = ({ chat, music, emotion }) => {
  return (
    <div className="nav">
      <div className="nav__logo">
        <h2>PIKAIA</h2>
      </div>
      <div className="nav__controls">
        <ul>
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">Chat</a>
          </li>
          <li>
            <a href="#">Music</a>
          </li>
        </ul>
      </div>
      <div className="nav__login">
        <div className="nav__avatar">
          <Avatar src={Portrait} />
          <h4>Jhon Doe</h4>
        </div>
        <Button className="nav__loginBtn">
          <MoreVertIcon />
        </Button>
      </div>
    </div>
  );
};

export default Header;
