import { useState, useEffect } from "react"

import Chart from 'chart.js/auto';
import { Line } from "react-chartjs-2";
import {CategoryScale} from 'chart.js'; 
Chart.register(CategoryScale);

const LineGraph = ({chartData}) => {

    return (
        <div>
            <Line
            data={chartData}
            options={{
                title:{
                display:true,
                text:'Title',
                fontSize:20
                },
                legend:{
                display:true,
                position:'right'
                }
            }}
            />
        </div>
    );
}

export default LineGraph;