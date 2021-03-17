import React,{ Component } from 'react';
import "./MoodTracker.css";
import { Line } from 'react-chartjs-2';

export default class MoodTracker extends Component{
    constructor(props){
        super(props);

        this.state = {
            data: {
                labels: ["Sun","Mon","Tue","Wen","Thu","Fri","Sat"],
                datasets: [{
                    label: "Happy",
                    backgroundColor: "rgba(255,0,255,0.75)",
                    data: [4,5,1,10,32,2,12]
                },
                {
                    label: "Sad",
                    backgroundColor: "rgba(0,255,0,0.75)",
                    data: [5,6,10,30,32,5,0],
                }
                    
                ]
            }
        }
    }
    setGradientColor= (canvas, color) =>{
        const ctx = canvas.getContext('2d');
        const gradient = ctx.createLinearGradient(0,0,0,400);
        gradient.addColorStop(0, color);
        gradient.addColorStop(0.95, "rgba(133,255,144,0.85)")
        return gradient;
    }
    getChartData = canvas =>{
        const data = this.state.data;
        if(data.datasets){
            let colors = ["rgba(255, 0, 255, 0.75)", "rgb(128,0,128)"];
            data.datasets.forEach((set,i) =>{
                set.backgroundColor = this.setGradientColor(canvas, colors[i]);
                set.borderColor= "white";
                set.borderWidth = 2;

            })
        }
        return data;
    }
    render(){
        return(
            <div className="MoodTracker_Container">
                <h3>Mood Tracker</h3>
                <Line 
                options ={{
                    responsive: true
                }}
                data={this.getChartData}
                />
            </div>
            
        )
    }
}
