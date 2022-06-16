import { StyleSheet, TouchableOpacity } from 'react-native';
import { useState, useEffect, useCallback } from "react"

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

import { Wifi } from '../components/wifi'
import '../components/wifi.styles.css'
import BatteryGauge from 'react-battery-gauge'

import LineGraph, { getDataXList, getDataYList } from '../components/chart.js'


import useWindowDimensions from '../screens/getScreenDimensions'
// import Heatmap from '../components/heatmap';

import React from "react";
import { HeatMapGrid } from "react-grid-heatmap";
import { checkState } from '../components/floatingButton.js';

const xLabels = new Array(23).fill(0).map((_, i) => `${i}`);
const yLabels = [];

export const dataVar = {
  labels: [0, 1, 2, 3, 4, 5, 6, 7],
  datasets: [
    {
      label: 'first set',
      backgroundColor: "rgba(75,192,192,0.2)",
      borderColor: "rgba(75,192,192,1)",
      borderWidth: 2,
      fill: false,
      data: [0, 0, 5, 3, 52, 0, 6]
    }
  ]
}

const dataRadar = [
  [0]
]

export default function StatusScreen() {

  var batteryValue = 30;
  const [chartData, setChartData] = useState(dataVar)
  const [heatmapData, setheatmapData] = useState(dataRadar)
  const [isLoaded, setIsLoaded] = useState(false);

  // const { h, w } = useWindowDimensions();

  const myRequestSQUAL = new Request('https://localhost:8000/squal');
  const myRequestRADAR = new Request('https://localhost:8000/radar');

  const updateData = () => {
    fetch(myRequestSQUAL)
      .then(function (response) {
        if (!response.ok) {
          throw new Error("HTTPS error, status = " + response.status);
        }
        return response.json();
      })
      .then(function (json) {
        setIsLoaded(true);
        fetchData(json);
        return
      })
      .catch(function (error) {
        // setIsLoaded(true);
        console.log('Error: ' + error.message)
      })

    fetch(myRequestRADAR)
      .then(function (response) {
        if (!response.ok) {
          throw new Error("HTTPS error, status = " + response.status);
        }
        return response.json();
      })
      .then(function (json) {
        fetchHeatMapData(json)
        return
      })
      .catch(function (error) {
        console.log('Error: ' + error.message)
      })

  };

  const fetchData = useCallback((json) => {
    // console.log(json)
    console.log("X axis: ", getDataXList(json.data))
    console.log("Y axis: ", getDataYList(json.data))
    setChartData({
      labels: getDataXList(json.data),
      datasets: [
        {
          label: json.name,
          data: getDataYList(json.data),
          backgroundColor: "rgba(75,192,192,0.2)",
          borderColor: "rgba(75,192,192,1)",
          borderWidth: 2,
          fill: false,
        }
      ]
    });
  }, []);

  const fetchHeatMapData = useCallback((json) => {
    console.log("Radar:", json.data)
    setheatmapData(json.data);
  }, []);

  // INTERVAL FOR ALL FETCHES ________________________________________________________________//////////////////////////////

  setInterval( () => {
    console.log("map OUT interval: ", checkState)
    if(checkState){
      updateData()
    }
  }, 1400);


  return (
    <View style={{ alignItems: 'center' }}>

      {/* TOP */}
      <View style={{ width: '80%', alignItems: 'center' }}>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <Text style={styles.title}>Status ESP32</Text>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

        <View style={styles.row}>
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.title}>Wifi connection</Text>
            <Wifi status="search" width={"50"} height={"auto"} /> {/* search, good-connection, fair-connection, poor-connection, error */}
          </View>

          <Text>{'\t\t\t'}</Text>
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.title}>Battery level</Text>
            <BatteryGauge value={batteryValue} padding={5} customization={batteryCustom} size={150} /> {/* https://npm.io/package/react-battery-gauge */}
          </View>
        </View>

      </View>

      {/* BOTTOM */}
      <View style={{ width: '90%' }}>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <View style={styles.row}>
          <Text style={[styles.title, { padding: 10 }]}>Status SENSORS</Text>
          <TouchableOpacity onPress={updateData} style={styles.roundButton1}>
            <Text style={styles.text}>Update Graphs</Text></TouchableOpacity>
        </View>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

        <View style={{ flexDirection: 'row', paddingBottom:5, justifyContent:'flex-start' }}>

          <View style={{ padding: 5, width: '50%', alignItems:'center' }}>
            <Text style={[styles.title,{color:'white'}]}>SQUAL</Text>
            <View style={{ backgroundColor: 'white', padding: 5,width:'100%'}}>
              <LineGraph chartData={chartData} />
            </View>
          </View>

          <View style={{ padding: 5, width: '50%', alignItems:'center' }}>
          <Text style={[styles.title,{color:'white'}]}>RADAR</Text>
            <View style={{ backgroundColor: 'white', padding: 5, height: '95%',width:'100%', justifyContent: 'flex-end' }}>
              {/* <Heatmap data={heatmapData}/> */}
              <div
                style={{
                  width: "100%",
                  fontFamily: "sans-serif"
                }}
              >
                <HeatMapGrid
                  data={heatmapData}
                  xLabels={xLabels}
                  yLabels={yLabels}
                  // Reder cell with tooltip
                  cellRender={(x, y, value) => (
                    <div title={`Pos(${x}, ${y}) = ${value}`}>{value}</div>
                  )}
                  xLabelsStyle={index => ({
                    color: index % 2 ? "transparent" : "#777",
                    fontSize: ".65rem"
                  })}
                  yLabelsStyle={() => ({
                    fontSize: ".65rem",
                    textTransform: "uppercase",
                    color: "#777"
                  })}
                  cellStyle={(_x, _y, ratio) => ({
                    background: `rgb(12, 160, 44, ${ratio})`,
                    fontSize: ".7rem",
                    color: `rgb(0, 0, 0, ${ratio / 2 + 0.4})`
                  })}
                  cellHeight="1.5rem"
                  xLabelsPos="bottom"
                // onClick={(x, y) => alert(`Clicked (${x}, ${y})`)}
                // yLabelsPos="right"
                // square
                />
              </div>
            </View>
          </View>

        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 5,
    height: 1,
    width: '100%',
  },
  row: {
    flex: 2,
    alignItems: 'center',
    flexDirection: "row",
    justifyContent: 'center',
  },
  roundButton1: {
    // width: 72,
    // height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 50,
    backgroundColor: 'white',
  },
  text: {
    textShadowOffset: { width: 1.2, height: 1.5 },
    textShadowColor: '#8f8f8f',
    // textshadowOpacity: 0.8,
    textShadowRadius: 2.5,
    fontWeight: 'bold',
    fontSize: 10,
    color: 'black'
  }
});

const batteryCustom = {
  "batteryBody": {
    "fill": "white",
    "strokeColor": "black",
    "strokeWidth": 2
  },
  "batteryCap": {
    "fill": "white",
    "strokeColor": "black",
    // "cornerRadius": 3,
    "strokeWidth": 2,
    "capToBodyRatio": 0.4
  },
  "batteryMeter": {
    "outerGap": 1,
    // "gradFill": [
    //   {
    //     "color": "red",
    //     "offset": 0
    //   },
    //   {
    //     "color": "orange",
    //     "offset": 15
    //   },
    //   {
    //     "color": "green",
    //     "offset": 90
    //   }
    // ]
  },
  "readingText": {
    "lightContrastColor": "ffe054",
    // "darkContrastColor": "#181509",
    // "lowBatteryColor": "red",
    // "fontFamily": "Arial",
    "fontSize": 12
  }
}