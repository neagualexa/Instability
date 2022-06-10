import { useState, useEffect } from "react"

import Chart from 'chart.js/auto';
import { Line } from "react-chartjs-2";
import {CategoryScale} from 'chart.js'; 
Chart.register(CategoryScale);
import zoomPlugin from 'chartjs-plugin-zoom';
Chart.register(zoomPlugin);

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
                plugins: {
                  zoom: {
                    zoom: {
                      wheel: {
                        enabled: true,
                      },
                      pinch: {
                        enabled: true,
                      },
                      sensitivity:0.5, 
                      // drag: true,
                      mode: 'x',
                    },
                    pan: {
                      enabled: true,
                      mode: 'xy',
                    }
                  }
                }
            }}
            />
        </div>
    );
}

export default LineGraph;