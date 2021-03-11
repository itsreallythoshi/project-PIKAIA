import React from "react";
import Chat from "./Componants/Chat";
import Mantras from "./Componants/Mantras";
import "./Styles/Chat__container.css";

function Chat__Container() {
  return (
    <div className="chat__container">
      <Mantras />
      <Chat />
    </div>
  );
}

export default Chat__Container;
