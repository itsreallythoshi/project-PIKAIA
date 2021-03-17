import React, { Component } from "react";
import "./prevReport.css";
import { Line } from "react-chartjs-2";

class PrevReport extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        labels: ["Sun", "Mon", "Tue", "Wen", "Thu", "Fri", "Sat"],
        datasets: [
          {
            label: "Happy",
            backgroundColor: "rgba(255,0,255,0.75)",
            data: [4, 5, 1, 10, 32, 2, 12],
          },
          {
            label: "Sad",
            backgroundColor: "rgba(0,255,0,0.75)",
            data: [30, 45, 10, 30, 32, 5, 20],
          },
        ],
      },
    };
  }
  setGradientColor = (canvas, color) => {
    const ctx = canvas.getContext("2d");
    const gradient = ctx.createLinearGradient(0, 0, 0, 200);
    gradient.addColorStop(0, color);
    gradient.addColorStop(0.95, "rgba(92,243,125,.7)");
    return gradient;
  };
  getChartData = (canvas) => {
    const data = this.state.data;
    if (data.datasets) {
      let colors = ["rgba(92,243,125,.7)", "rgba(0,214,243,.43)"];
      data.datasets.forEach((set, i) => {
        set.backgroundColor = this.setGradientColor(canvas, colors[i]);
        set.borderColor = "white";
        set.borderWidth = 1;
      });
    }
    return data;
  };
  render() {
    return (
      <div className="dashboard__chart">
        <div className="dashboard__chartInfo">
          <h3>Emotion Analytics</h3>
          <p>
            Track your daily emotion changes, and improve your mental health.
          </p>
        </div>
        <div className="dashboard__chartLine">
          <Line
            options={{
              legend: {
                labels: {
                  fontColor: "white",
                },
              },
              responsive: true,
              scales: {
                yAxes: [
                  {
                    gridLines: {
                      display: false,
                      drawOnChartArea: false,
                    },
                    ticks: {
                      display: false,
                      beginAtZero: true,
                    },
                  },
                ],
                xAxes: [
                  {
                    gridLines: {
                      display: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                ],
              },
            }}
            data={this.getChartData}
          />
        </div>
      </div>
    );
  }
}

export default PrevReport;
