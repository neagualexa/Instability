import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

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

export default function ModalScreen() {

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
    console.log(json)
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
    <View style={{ alignItems: 'center', justifyContent:'center', flex:1}}>
      <div style={{height:550, width:1060, backgroundColor:'white'}}>
        <LineGraph chartData={chartData} />
        <button onClick={updateData}>Update</button>
      </div>
    </View>
  );

  // return (
  //   // <View style={styles.container}>
  //   //   <Text style={styles.title}>How to control the Rover</Text>
  //   //   <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
  //   //   <EditScreenInfo path="/screens/ModalScreen.tsx" />

  //   //   {/* Use a light status bar on iOS to account for the black space above the modal */}
  //   //   <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
  //   // </View>
  //   <div>
  //     <Chart></Chart>
  //   </div>
  // );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: "row",
    alignItems: 'center', //vertical
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    // margin: 20,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
