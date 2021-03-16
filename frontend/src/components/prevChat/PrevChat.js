import React from "react";
import ChatBot from "./Componants/ChatBot";
import Quotes from "./Componants/Quotes";
import "./Styles/prevChat.css";

const PrevChat = () => {
  return (
    <div className="dashboard__chat">
      <Quotes />
      <ChatBot />
    </div>
  );
};

export default PrevChat;
