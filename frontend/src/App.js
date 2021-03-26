import React from "react";

import "./app.css";

import AppContainer from "./Layout/AppContainer/AppContainer";
import BackgroundOne from "./components/BackgroundOne/BackgroundOne";

export default function App() {
  return (
    <div className="app">
      <BackgroundOne />
      <AppContainer />
    </div>
  );
}
