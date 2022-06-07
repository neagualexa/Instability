import { useState, useEffect } from "react"

import Chart from 'chart.js/auto';
import { Line } from "react-chartjs-2";
import {CategoryScale} from 'chart.js'; 
Chart.register(CategoryScale);
import 'chartjs-plugin-zoom'

export function getDataXList(data){
    var data_list = [];
    for(let d in data){
      data_list.push(data[d].x);
    }
    return data_list;
  }

export function getDataYList(data){
    var data_list = [];
    for(let d in data){
      data_list.push(data[d].y);
    }
    return data_list;
  }

const LineGraph = ({chartData}) => {
    
    return (
        <div>
            <Line
            data={chartData}
            options={{
                responsive: true,
                title:{
                    display:true,
                    text:'Title',
                    fontSize:20
                },
                legend:{
                    display:true,
                    position:'right'
                },
                zoom: {
                  enabled: true,
                  mode: 'x',
                },
                pan: {
                  enabled: true,
                  mode: 'x',
                },
            }}
            />
        </div>
    );
}

export default LineGraph;