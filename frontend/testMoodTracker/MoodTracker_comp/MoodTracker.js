import React, { Component } from 'react';
import "./MoodTracker.css";
import LineGraph from "./LineGraph";
// import chartIcon from "../../assets/chart-icon.svg";
import { dailyDataHappy, daily2DataSad, dailyLabels, hourlyDatahappy, hourly2DataSad, hourlyLabels  } from "./MoodTrackerData";
// Install 'npm install --save react-chartjs-2 chart.js'
export default class Dashboard extends Component {
    state = {
        data: dailyDataHappy,
        average: daily2DataSad,
        labels: dailyLabels
    }
    handleButtonClick = e => {
        const { value } = e.target;
        const isAnnual = value === "annual";

        const newData = isAnnual ? dailyDataHappy : hourlyDatahappy;
        const newLabels = isAnnual ? dailyLabels : hourlyLabels;
        const newAverage = isAnnual ? daily2DataSad : hourly2DataSad;

        this.setState({
            data: newData,
            average: newAverage,
            labels: newLabels
        })
        
    }

    render() {
        const { data,average, labels } = this.state;
        return (
            <div className="dashboard__chart">
                {/* <header>
                    <img src={chartIcon} alt="bar chart icon" />
                    <h1>Sales Dashboard</h1>
                </header> */}
                <div className="buttonContainer">
                    <button
                        value="annual"
                        onClick={this.handleButtonClick}
                    >
                        Daily
                    </button>

                    <button
                        value="lastquarter"
                        onClick={this.handleButtonClick}
                    >
                        Hourly
                    </button>
                </div>

                <LineGraph
                    data={data}
                    average={average}
                    labels={labels} />

            </div>
        )
    }
}