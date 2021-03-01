import React from "react";
import "./AppContainer.css";
import NavBar from "./Componants/Navbar";
import Dashboard from "./Componants/Dashboard";
import Footer from "./Componants/Footer";

function AppContainer() {
  return (
    <div className="appContainer">
      <NavBar />
      <Dashboard />
      <Footer />
    </div>
  );
}

export default AppContainer;
