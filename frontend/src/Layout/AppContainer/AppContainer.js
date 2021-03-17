import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link,
  // useRouteMatch,
  // useParams,
} from "react-router-dom";

import "./appContainer.css";

import Admin from "./../../Pages/Admin/Admin";
import Member from "./../../Pages/Member/Member";
import User from "./../../Pages/User/User";

function AppContainer() {
  return (
    <Router>
      <div className="appContainer">
        <Switch>
          <Route path={["/login", "/signup"]}>
            <Member />
          </Route>
          <Route path="/user/dashboard">
            <User />
          </Route>
          <Route path="/admin">
            <Admin />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default AppContainer;
