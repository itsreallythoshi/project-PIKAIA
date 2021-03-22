import React, { Component } from 'react'
import Chart from "chart.js";
import "./LineGraph.css";
let myLineChart;
export default class YourLineGraph extends Component {

    //You can view the walkthrough code at any time by referring to the gists in the Medium article, or the Dashboard.js and LineChart.js files. Some code in LineChart.js/Dashboard.js will not reflect all changes mentioned in the article. Styling is automatically imported in both of your views. You can use my provided classes or write your own styles. ChartJS is already installed.

    chartRef = React.createRef();
    
    componentDidMount() {
        this.buildChart();
    }
    componentDidUpdate(){
        this.buildChart();
    }
    buildChart = () =>{
        const myChartRef = this.chartRef.current.getContext("2d");
        const { data, average, labels } = this.props;

        if (typeof myLineChart !== "undefined") myLineChart.destroy();

        myLineChart = new Chart(myChartRef, {
            type: "radar",
            data: {
                //Bring in data
                labels: labels,
                datasets: [
                    {
                        label: "Happy",
                        data: data,
                    },
                    {
                        label: "Sad",
                        data: average,
                    }
                ]
            },
            options: {
                //Customize chart options
            }
        });
    }
    render() {
        return (
            <div className="graphContainer">
                <canvas
                    id="myChart"
                    ref={this.chartRef}
                />
            </div>
        )
    }
}
