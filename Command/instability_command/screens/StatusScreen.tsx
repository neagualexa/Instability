import { StyleSheet, TouchableOpacity } from 'react-native';
import { useState, useEffect, useCallback } from "react"

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

import BatteryGauge from 'react-battery-gauge'
import { BiWifiOff, BiWifi } from "react-icons/bi";
import { BsBatteryFull,BsBatteryCharging,BsBatteryHalf,BsBattery } from "react-icons/bs";

import LineGraph, { getDataXList, getDataYList } from '../components/chart.js'


import useWindowDimensions from '../screens/getScreenDimensions'
// import Heatmap from '../components/heatmap';

import React from "react";
import { HeatMapGrid } from "react-grid-heatmap";
import { checkState } from '../components/floatingButton.js';

const xLabels = new Array(36).fill(0).map((_, i) => `${i}`);
const yLabels = new Array(24).fill(0).map((_, i) => `${i}`);

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

const batteryValDefault = 100;

export default function StatusScreen() {

  const [chartData, setChartData] = useState(dataVar)
  const [heatmapData, setheatmapData] = useState(dataRadar)
  const [batteryVal, setBatteryData] = useState(batteryValDefault)

  // const { h, w } = useWindowDimensions();

  const myRequestSQUAL = new Request('https://localhost:8000/squal');
  const myRequestRADAR = new Request('https://localhost:8000/radar');
  const myRequestULTRASONIC = new Request('https://localhost:8000/ultrasonic');
  const myRequestBATTERY = new Request('https://localhost:8000/battery');

  const updateData = () => {
    fetch(myRequestSQUAL)
      .then(function (response) {
        if (!response.ok) {
          throw new Error("HTTPS error, status = " + response.status);
        }
        return response.json();
      })
      .then(function (jsonSQUAL) {

        fetch(myRequestULTRASONIC)
          .then(function (response) {
            if (!response.ok) {
              throw new Error("HTTPS ULTRASONIC error, status = " + response.status);
            }
            return response.json();
          })
          .then(function (jsonULTRASONIC) {

            fetch(myRequestBATTERY)
              .then(function (response) {
                if (!response.ok) {
                  throw new Error("HTTPS BATTERY error, status = " + response.status);
                }
                return response.json();
              })
              .then(function (jsonBattery) {
                fetchData(jsonSQUAL, jsonULTRASONIC, jsonBattery); //---------------------------------------
                setBatteryData(jsonBattery.data[jsonBattery.data.length-1].y)
                return
              })
              .catch(function (error) {
                console.log('Radar Error: ' + error.message)
              })

            return
          })
          .catch(function (error) {
            // setIsLoaded(true);
            console.log('Ultrasonic Error: ' + error.message)
          })
        // fetchData(json);
        return
      })
      .catch(function (error) {
        // setIsLoaded(true);
        console.log('SQUAL Error: ' + error.message)
      })

    fetch(myRequestRADAR)
      .then(function (response) {
        if (!response.ok) {
          throw new Error("HTTPS RADAR error, status = " + response.status);
        }
        return response.json();
      })
      .then(function (json) {
        fetchHeatMapData(json)
        return
      })
      .catch(function (error) {
        console.log('Radar Error: ' + error.message)
      })

  };

  const fetchData = useCallback((jsonSQUAL, jsonULTRASONIC, jsonBattery) => {
    // console.log(json)
    // console.log("X axis: ", getDataXList(json.data))
    // console.log("Y axis: ", getDataYList(json.data))
    setChartData({
      labels: getDataXList(jsonSQUAL.data),
      datasets: [
        {
          label: jsonSQUAL.name,
          data: getDataYList(jsonSQUAL.data),
          backgroundColor: "rgba(75,192,192,0.2)",
          borderColor: "rgba(75,192,192,1)",
          borderWidth: 2,
          fill: false,
        },
        {
          label: jsonULTRASONIC.name,
          data: getDataYList(jsonULTRASONIC.data),
          backgroundColor: "rgba(115,139,233,0.2)",
          borderColor: "rgba(115,139,233,1)",
          borderWidth: 2,
          fill: false,
        },
        {
          label: jsonBattery.name,
          data: getDataYList(jsonBattery.data),
          backgroundColor: "rgba(100,139,100,0.2)",
          borderColor: "rgba(100,139,100,1)",
          borderWidth: 2,
          fill: false,
        }
      ]
    });
  }, []);

  const fetchHeatMapData = useCallback((json) => {
    // console.log("Radar:", json.data)
    setheatmapData(json.data);
  }, []);

  // INTERVAL FOR ALL FETCHES ________________________________________________________________//////////////////////////////
  let updateCycle
  useEffect(() => {
    updateCycle = setInterval( () => {
                              console.log("STATUS: update interval: ", checkState)
                              if(checkState){
                                updateData()
                              }
                            }, 1400); // Set a timer as a side effect
    return () => clearInterval(updateCycle) // Here is the cleanup function: we take down the timer
  },[])


  return (
    <View style={{ alignItems: 'center' }}>

      {/* TOP */}
      <View style={{ width: '80%', alignItems: 'center' }}>

        {/* <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" /> */}
          <View style={styles.row}>
            {/* <Text style={styles.title}>Status ESP32</Text> */}
            <Text style={[styles.title, { padding: 10 }]}>Status SENSORS & ESP32</Text>
            <TouchableOpacity onPress={updateData} style={styles.roundButton1}>
              <Text style={styles.text}>Update Graphs</Text></TouchableOpacity>
          </View>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

        <View style={[styles.row, {height:'100%'}]}>
          <View style={{ alignItems: 'center', flexDirection:'row' }}>
            <Text style={[styles.title,{color:'white', fontSize:14}]}>ESP32 WiFi connection {'\t'}</Text>
              {/* TODO: GET WIFI SIGNAL CONNECTED OR NOT */}
              {/* <BiWifiOff style={{color:'white'}} size={50}/> */}
              {/* <Text>{'\t\t'}</Text> */}
              <BiWifi style={{color:'white'}} size={50}/>

              <Text style={[styles.title,{color:'white', fontSize:14}]}>{'\t'} & battery {'\t'}</Text>

              <BatteryGauge value={batteryVal} padding={3} customization={batteryCustom} size={100} />
          </View>
          
          {/* <View style={{ alignItems: 'center' }}>
            <Text style={[styles.title,{color:'white', fontSize:12}]}>Battery level</Text>
            <BsBatteryFull style={{color:'white'}} size={50}/>
            <BatteryGauge value={batteryValue} padding={3} customization={batteryCustom} size={100} />
              https://npm.io/package/react-battery-gauge 
          </View>  */}
        </View>

      </View>

      {/* BOTTOM */}
      <View style={{ width: '90%'}}>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

        <View style={{ flexDirection: 'row', paddingBottom:5, justifyContent:'flex-start' }}>

          <View style={{ padding: 5, width: '45%',alignItems:'center' }}>
            <Text style={[styles.title,{color:'white', fontSize:14}]}>SQUAL</Text>
            <div  style={{ backgroundColor: 'white', padding: 7, width: '100%', position:'relative', height:'100%'}}>
              <LineGraph chartData={chartData} />
            </div >
          </View>

          <View style={{ padding: 5, width: '55%', alignItems:'center' }}>
          <Text style={[styles.title,{color:'white', fontSize:14}]}>RADAR</Text>
            <View style={{ backgroundColor: 'white', width: '100%', padding:5, justifyContent: 'flex-end' }}>
              {/* <Heatmap data={heatmapData}/> */}
              {/* <div
                style={{
                  width: "100%",
                  fontFamily: "sans-serif"
                }}
              > */}
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
                    fontSize: ".5rem"
                  })}
                  yLabelsStyle={(index) => ({
                    fontSize: ".5rem",
                    textTransform: "uppercase",
                    color: index % 2 ? "transparent" : "#777",
                  })}
                  cellStyle={(_x, _y, ratio) => ({
                    background: `rgb(8, 143, 143, ${ratio})`,
                    fontSize: ".5rem",
                    color: `rgb(0, 0, 0, ${ratio / 2 + 0.4})`
                  })}
                  cellHeight="0.75rem"
                  xLabelsPos="bottom"
                // onClick={(x, y) => alert(`Clicked (${x}, ${y})`)}
                // yLabelsPos="right"
                // square
                />
              {/* </div> */}
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
    fontSize: 16,
    fontWeight: 'bold',
  },
  separator: {
    marginTop: 5,
    marginBottom: 5,
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
    padding: 7,
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
    //     "color": "rgb(8, 143, 143, 1)",
    //     "offset": 100
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