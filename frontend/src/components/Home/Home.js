import React from "react";

import PrevTimer from "./../PrevTimer/PrevTimer";
import PrevReport from "./../prevReport/PrevReport";
import PrevChat from "./../prevChat/PrevChat";


import "./home.css";

const Home = () => {
  return (
    <main className="dashboard-home">
      <div className="dashboard-home__left">
        <PrevTimer />
        <PrevReport />
      </div>
      <div className="dashboard-home__center">
        <PrevChat className="dashboard-home__chat" />
      </div>
      <div className="dashboard-home__right">
        {/* <PrevMusic className="dashboard-home__music" /> */}
      </div>
    </main>
  );
};

export default Home;
