import { StyleSheet, TouchableOpacity } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

import { Wifi } from '../components/wifi'
import '../components/wifi.styles.css'
import BatteryGauge from 'react-battery-gauge'

import LineGraph, {getDataXList, getDataYList} from '../components/chart.js'
import { useState, useEffect, useCallback } from "react"

import useWindowDimensions from '../screens/getScreenDimensions'

export const dataVar = {
  labels: [0,1,2,3,4,5,6,7],
  datasets: [
    {
      label: 'first set',
      backgroundColor: "rgba(75,192,192,0.2)",
      borderColor: "rgba(75,192,192,1)",
      borderWidth: 2,
      fill: false,
      data: [0,0,5,3,52,0,6]
    }
  ]
}

export default function StatusScreen() {

  var batteryValue = 30;
  const [chartData, setChartData] = useState(dataVar)
  const [isLoaded, setIsLoaded] = useState(false);

  const { h, w } = useWindowDimensions();

  // setInterval(
  //   () => updateData()
  // , 1200);

  const myRequest = new Request('https://localhost:8000/squal');

  const updateData = ()=>{
    fetch(myRequest)
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
      // .catch(function (error) {
        // setIsLoaded(true);
      //   console.log('Error: ' + error.message)
      // })

  };

  const fetchData = useCallback((json)=>{
    // console.log(json)
    console.log("X axis: ",  getDataXList(json.data))
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


  return (
    <View style={{alignItems:'center'}}>
      
      {/* TOP */}
      <View style={{width:'80%', alignItems:'center'}}>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <Text style={styles.title}>Status ESP32</Text>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

        <View style={styles.row}>
          <View style={{alignItems:'center'}}>
            <Text style={styles.title}>Wifi connection</Text>
            <Wifi status="search" width={"50"} height={"auto"} /> {/* search, good-connection, fair-connection, poor-connection, error */}
          </View>
          
          <Text>{'\t\t\t'}</Text>
          <View style={{alignItems:'center'}}>
            <Text style={styles.title}>Battery level</Text>
            <BatteryGauge value={batteryValue} padding={5} customization={batteryCustom} size={150} /> {/* https://npm.io/package/react-battery-gauge */}
          </View>
        </View>

      </View>

      {/* BOTTOM */}
      <View style={{width:'80%'}}>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
          <View style={styles.row}>
            <Text style={[styles.title,{padding:10}]}>Status SENSORS</Text>
            <TouchableOpacity onPress={updateData} style={styles.roundButton1}>
              <Text style={styles.text}>Update Graphs</Text></TouchableOpacity>
          </View>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

        <View style={{flexDirection:'row'}}>
          
            <View style={{padding: 5, width:'50%'}}>
                <View style={{ backgroundColor: 'white', padding: 5 }}>
                  <LineGraph chartData={chartData} />
                </View>
            </View>

            <View style={{padding: 5, width:'50%'}}>
                <View style={{backgroundColor: 'white', padding: 5 }}>
                  <LineGraph chartData={chartData} />
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
    marginVertical: 10,
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
    width: 72,
    height: 50,
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
    fontSize: 14,
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