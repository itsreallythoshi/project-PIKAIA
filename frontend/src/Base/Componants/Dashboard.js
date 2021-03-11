import React from "react";
import Chat__Container from "./Chat/Chat__Container";
import Controls from "./Controls/Controls";
import "./Dashboard.css";
import MusicPlayer from "./Music_Player/MusicPlayer";

function Dashboard() {
  return (
    <div className="dashboard">
      {/* swap the divs with the respective react componant 
        while assiging the class name, as it's required in CSS Grid*/}

      <div className="dashboard__container">
        <div className="dashboard__left">
          <Controls />
        </div>
        <div className="dashboard__middle">
          <Chat__Container />
        </div>
        <div className="dashboard__left">
          <MusicPlayer />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
