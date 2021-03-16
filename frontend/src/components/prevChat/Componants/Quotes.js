import React, { Component } from "react";
import "../Styles/Quotes.css";
import Morning from "../assets/Morning-Clouds.svg";
import Night from "../assets/Night Clouds.svg";

class Quotes extends Component {
  state = { today: new Date(), hour: null, username: "Jhon" };

  callTime() {
    setInterval(() => {
      this.setState({ today: new Date(), hour: new Date() });
    }, 1000);
  }

  componentDidMount() {
    this.getHour();
  }

  getHour = () => {
    const date = new Date();
    const hour = date.getHours();
    this.setState({
      hour,
    });
  };

  render() {
    const { hour, username } = this.state;
    return (
      <div className="quotes">
        <div className="quotes__left">
          {" "}
          <div className="quotes__time">
            <h1>
              {this.state.today.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })}
              {this.callTime()}
            </h1>
          </div>
          <div className="quotes__greeting">
            <h1>
              {hour < 12
                ? `Good Morning, ${username}`
                : `Good Evening, ${username}.`}
            </h1>
          </div>
          <div className="quotes__words">
            <p>
              "Your success will not be determined by your gender or your
              ethnicity, but only on the scope of your dreams."
            </p>
          </div>
        </div>
        <div className="quotes__right">
          <img src={hour < 12 ? Morning : Night} />
        </div>
      </div>
    );
  }
}

export default Quotes;
