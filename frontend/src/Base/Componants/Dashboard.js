import React from "react";
import "./Dashboard.css";
import Library from "./Music_Player/components/Library";
import MusicPlayer from "./Music_Player/MusicPlayer";

function Dashboard() {
  return (
    <div className="dashboard">
      {/* swap the divs with the respective react componant 
        while assiging the class name, as it's required in CSS Grid*/}

      <div className="dashboard__container">
        <MusicPlayer className="dashboard__musicPlayer" />
      </div>
    </div>
  );
}

export default Dashboard;
