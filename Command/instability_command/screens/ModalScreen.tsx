import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

import LineGraph from '../components/chart.js'
import { useState, useEffect, useCallback } from "react"

const dataVar = {
  labels: [0,1],
  datasets: [
    {
      label: 'first set',
      backgroundColor: "rgba(75,192,192,0.2)",
      borderColor: "rgba(75,192,192,1)",
      borderWidth: 2,
      fill: false,
      data: [0,0]
    }
  ]
}

export default function ModalScreen() {

  const [chartData, setChartData] = useState(dataVar)

  function getDataXList(data){
    var data_list = [];
    for(let d in data){
      data_list.push(data[d].x);
    }
    return data_list;
  }

  function getDataYList(data){
    var data_list = [];
    for(let d in data){
      data_list.push(data[d].y);
    }
    return data_list;
  }

  // setInterval(
  //   () => updateData()
  // , 1200);

  const updateData = ()=>{
    var myRequest = new Request('https://localhost:8000/squal');
    fetch(myRequest)
      .then(function (response) {
        if (!response.ok) {
          throw new Error("HTTPS error, status = " + response.status);
        }
        return response.json();
      })
      .then(function (json) {
        fetchData(json);
        return 
      })
      // .catch(function (error) {
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
    <div style={{height:1000, width:1000}}>
      <LineGraph chartData={chartData} />
      <button onClick={updateData}>Update</button>
    </div>
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
