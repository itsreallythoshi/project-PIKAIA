import React from "react";
import Home from "./../../components/Home/Home";

import "./dashboard.css";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";

const Dashboard = () => {
  let match = useRouteMatch();

  return (
    <Router>
      <main className="dashboard">
        <Switch>
          <Route path={`${match.path}/preferences`}>
            <h1>path: /chat</h1>
          </Route>
          <Route path={`${match.path}/music`}>
            <h1>path: /music</h1>
          </Route>
          <Route path={`${match.path}/chat`}>
            <h1>path: /chat</h1>
          </Route>
          <Route path={`${match.path}/`}>
            <Home />
          </Route>
        </Switch>
      </main>
    </Router>
  );
};

export default Dashboard;
