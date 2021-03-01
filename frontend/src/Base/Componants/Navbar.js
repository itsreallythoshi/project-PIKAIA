import React from "react";
import "./Navbar.css";
import Portrait from "./Assets/Avatar.jpg";
import { Avatar, Button } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";

function NavBar() {
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
          <h4>Shuhaib Ahamed</h4>
        </div>
        <Button className="nav__loginBtn">
          <MoreVertIcon />
        </Button>
      </div>
    </div>
  );
}

export default NavBar;
