import React from "react";
import Home from "./../../components/Home/Home";
import SwipeableViews from "react-swipeable-views";
import Portrait from "./assets/Avatar.jpg";
import { Avatar, Button } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Header from "../../Layout/Header/Header";
import { Tabs, Tab, makeStyles } from "@material-ui/core";

import "./dashboard.css";
import {
  BrowserRouter as Router,
  // Switch,
  // Route,
  // Link,
  // useRouteMatch,
  // useParams,
} from "react-router-dom";
import PrevMusic from "../../components/prevMusic/PrevMusic";

class Dashboard extends React.Component {
  state = {
    index: 0,
  };

  handleChange = (event, value) => {
    this.setState({
      index: value,
    });
  };

  handleChangeIndex = (index) => {
    this.setState({
      index,
    });
  };

  render() {
    const { index } = this.state;

    return (
      <Router>
        <main className="dashboard">
          <div className="nav">
            <div className="nav__logo">
              <h2>PIKAIA</h2>
            </div>
            <div className="nav__controls">
              <Tabs
                value={index}
                fullWidth
                onChange={this.handleChange}
              >
                <Tab label="Home" />
                <Tab label="Chat" />
                <Tab label="Music" />
              </Tabs>
            </div>
            <div className="nav__login">
              <div className="nav__avatar">
                <Avatar src={Portrait} />
                <h4>Jhon Doe</h4>
              </div>
              <Button className="nav__loginBtn">
                <MoreVertIcon />
              </Button>
            </div>
          </div>

          {/* <Switch>
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
        </Switch> */}

          <div className="dashbord__container">
            <SwipeableViews
              className="dashbord__swipableContainer"
              index={index}
              onChangeIndex={this.handleChangeIndex}
              enableMouseEvents
            >
              <div style={Object.assign({})}>
                <Home />
              </div>
              <div style={Object.assign({})}></div>
              <div style={Object.assign({})}>
                <PrevMusic />
              </div>
            </SwipeableViews>
          </div>
        </main>
      </Router>
    );
  }
}

export default Dashboard;
