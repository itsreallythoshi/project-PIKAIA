import React from "react";

import "./App.css";

import AppContainer from "./App/AppContainer";
import BackgroundOne from "./Base/BackgroundOne";

export default function App() {
  return (
    <div className="app">
      <BackgroundOne />
      <AppContainer />
    </div>
  );
}
