import { StyleSheet, TouchableOpacity, Button } from 'react-native';
import { useCallback, useState, useEffect } from 'react';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { GiMarsCuriosity, GiCartwheel } from 'react-icons/gi';
import Bulb from 'react-bulb';
import Arrow from '@elsdoerfer/react-arrow';

import LineGraph, { getDataXList, getDataYList } from '../components/chart.js'
import useWindowDimensions from '../screens/getScreenDimensions'


export default function ControlScreen({ navigation }: RootTabScreenProps<'Control'>) {

  function pressDirection(direction) {
    console.log('Go ', direction, '!');
  }

  const { h, w } = useWindowDimensions();

  var myRequest = new Request('https://localhost:8000/motors');

  const connect = () => {
    fetch(myRequest)
      .then(function (response) {
        if (!response.ok) {
          throw new Error("HTTPS /motors error, status = " + response.status);
        }
        return response.json();
      })
      .then(function (json) {
        // console.log(json);
        getOrientation(json.orientation);
        setColour(json.data);
        fetchData(json.data);
        return
      })
      .catch(function (error) {
        console.log('Error: ' + error.message)
      })
  };

  const stationaty = {
    labels: [0, 1, 2],
    datasets: [
      {
        label: 'LEFT stationary',
        backgroundColor: "rgba(255, 0, 0, 0.2)",
        borderColor: "rgba(255, 0, 0, 1)",
        borderWidth: 2,
        fill: false,
        data: [0, 0, 0]
      },
      {
        label: 'RIGHT stationary',
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 2,
        fill: false,
        data: [0, 0, 0]
      }
    ]
  }

  const [leftColour, setLeft] = useState("red");
  const [rightColour, setRight] = useState("red");
  const [orientation, setOrientation] = useState(90);
  const [motorSpeed, setMotorSpeed] = useState(stationaty);

  const setColour = useCallback((json) => {
    if (json.left[json.left.length-1].y == 0) {
      setLeft("red")
    } else {
      setLeft("green")
    }

    if (json.right[json.right.length-1].y == 0) {
      setRight("red")
    } else {
      setRight("green")
    }
  }, []);

  const getOrientation = useCallback((orientation) => {
    setOrientation(orientation);
  }, []);

  const fetchData = useCallback((json) => {
    // console.log(json)
    console.log("Left: ", getDataYList(json.left))
    console.log("Right: ", getDataYList(json.right))
    setMotorSpeed({
      labels: (getDataXList(json.left).length >= getDataXList(json.right).length ? getDataXList(json.left) : getDataXList(json.right)),
      datasets: [
        {
          label: "LEFT velocity",
          data: getDataYList(json.left),
          backgroundColor: "rgba(255, 0, 0, 0.2)",
          borderColor: "rgba(255, 0, 0, 1)",
          borderWidth: 2,
          fill: false,
        },
        {
          label: "RIGHT velocity",
          data: getDataYList(json.right),
          backgroundColor: "rgba(75,192,192,0.2)",
          borderColor: "rgba(75,192,192,1)",
          borderWidth: 2,
          fill: false,
        },
      ]
    });
  }, []);


  return (
    <View style={{alignItems:'center'}}>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Text style={styles.title}>Controller page</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

      <View style={styles.main}>

        {/* LEFT */}
        <View style={{}}>

          {/* ROVER */}
          <View style={styles.row}>
            <GiMarsCuriosity color="white" size={300} />

            <View style={{}}>
              <div style={{paddingLeft:70, paddingBottom:20}}>
                <Text style={styles.title}>Motors:</Text>
              </div>

              <div style={{ paddingLeft: 30, paddingRight: 30, paddingBottom: 15  }}>
                <GiCartwheel color="white" size={50} />
                <Bulb size={10} color={leftColour} style={{ padding: 10 }} />
                <Text style={{ color: "white", fontSize: 16, fontWeight: 'bold' }}>  LEFT </Text>

              </div>

              <div style={{ paddingLeft: 30, paddingRight: 30, paddingBottom: 15 }}>
                <GiCartwheel color="white" size={50} />
                <Bulb size={10} color={rightColour} style={{ padding: 10 }} />
                <Text style={{ color: "white", fontSize: 16, fontWeight: 'bold' }}> RIGHT </Text>
              </div>
            </View>

            {/* ORIENTATION ARROW */}
            <View>
              <div style={{paddingBottom:20}}>
                <Text style={styles.title}>Direction:</Text>
              </div>
              <View style={{height:110, justifyContent:'center'}}>
                <Arrow angle={orientation} length={350} lineWidth={15} color='red'
                  style={{
                    width: '100px',
                    height: '100px'
                  }}
                />
              </View>
            </View>
            
          </View>

          {/* GRAPH */}
          <View style={{padding: 30}}>
            <View style={styles.row}>
              <View style={{ width: 500, backgroundColor: 'white', padding: 5 }}>
                <LineGraph chartData={motorSpeed} />
              </View>
              <View style={{ padding: 10 }}>
                <TouchableOpacity onPress={connect} style={styles.roundButton1}>
                  <Text style={styles.text}>Update</Text></TouchableOpacity>
              </View>
            </View>
          </View>

        </View>

        {/* RIGHT */}
        <View style={{paddingLeft:100}}>

          {/* Joystick */}
          <View style={{alignItems:'center'}}>
            <TouchableOpacity
              onPress={() => pressDirection("forward")}
              style={styles.roundButton1}
            >
              <Text style={styles.text}>FORWARD</Text>
            </TouchableOpacity>


            <View style={styles.row}>
              <TouchableOpacity
                onPress={() => pressDirection("left")}
                style={styles.roundButton1}
              >
                <Text style={styles.text}>LEFT</Text>
              </TouchableOpacity>

              <Text>        +        </Text>

              <TouchableOpacity
                onPress={() => pressDirection("right")}
                style={styles.roundButton1}
              >
                <Text style={styles.text}>RIGHT</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={() => pressDirection("backwards")}
              style={styles.roundButton1}
            >
              <Text style={styles.text}>BACK</Text>
            </TouchableOpacity>
          </View>
        </View>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 2,
    flexDirection: "row",
    // alignItems: 'center', //vertical
    // justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    // margin: 20,
    justifyContent: 'center',
  },
  row: {
    flex: 3,
    alignItems: 'center',
    flexDirection: "row",
    // margin: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    // marginTop: 20,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  roundButton1: {
    width: 90,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    borderRadius: 80,
    backgroundColor: 'white',
    // alignSelf: "flex-start",
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
