import React from "react";
import "./Dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard">
        
        {/* swap the divs with the respective react componant 
        while assiging the class name, as it's required in CSS Grid*/}

      <div className="dashboard__container">
        <div className="dashboard__timer"></div>
        <div className="dashboard__moodTracker"></div>
        <div className="dashboard__state"></div>
        <div className="dashboard__chatBot"></div>
        <div className="dashboard__musicPlayer"></div>
        <div className="dashboard__suggessions"></div>
      </div>
    </div>
  );
}

export default Dashboard;
