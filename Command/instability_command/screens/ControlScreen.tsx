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
import { checkState } from '../components/floatingButton.js';

var default_dir = "-"

export default function ControlScreen({ navigation }: RootTabScreenProps<'Control'>) {

  // TODO: actually implement the joystick
  // function pressDirection(direction) {
  //   console.log('Go ', direction, '!');
  // }

  //detecting arrow key presses
  const [joystickDirection, setJoystickDirection] = useState(default_dir)

  // useEffect(() => {
    document.onkeydown = (e) => {
      e = e || window.event;
      if (e.key === 'ArrowUp') {
        console.log('up arrow pressed')
        setJoystickDirection("F")
        remoteContol("forward")
        
      } else if (e.key === 'ArrowDown') {
        console.log('down arrow pressed')
        setJoystickDirection("B")
        remoteContol("backwards")

      } else if (e.key === 'ArrowLeft') {
        console.log('left arrow pressed')
        setJoystickDirection("L")
        remoteContol("left")

      } else if (e.key === 'ArrowRight') {
        console.log('right arrow pressed')
        setJoystickDirection("R")
        remoteContol("right")
      }
      else{
        // press any other key to stop the remove control movement
        console.log('arrow NOT pressed')
        setJoystickDirection("-")
        remoteContol("-") 
      }
    }
  // },[]);

    // SEND JOYSTICK CONTOL__________________________________________________________
    const remoteContol = (joystickDirection) => {
      var xhr = new XMLHttpRequest()
      console.log("sending to /joystick...")
      // get a callback when the server responds
      xhr.addEventListener('load', () => {
        console.log(xhr.responseText)
      })
      xhr.open('POST', 'https://localhost:8000/joystick')
      xhr.send(
        JSON.stringify({ 
          direction: joystickDirection
         })
      )
    }

  const { h, w } = useWindowDimensions();

  // INTERVAL FOR ALL FETCHES ________________________________________________________________//////////////////////////////
  let updateCycle
  useEffect(() => {
    updateCycle = setInterval( () => {
                                console.log("CONTROL: update interval: ", checkState)
                                if(checkState){
                                  connect()
                                }

                              }, 1400); // Set a timer as a side effect
    return () => clearInterval(updateCycle) // Here is the cleanup function: we take down the timer
  },[])
    

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
        backgroundColor: "rgba(180, 40, 100, 0.2)",
        borderColor: "rgba(150, 40, 100, 1)",
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
    // console.log("Left: ", getDataYList(json.left))
    // console.log("Right: ", getDataYList(json.right))
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
          backgroundColor: "rgba(180, 40, 100, 0.2)",
          borderColor: "rgba(150, 40, 100, 1)",
          borderWidth: 2,
          fill: false,
        },
      ]
    });
  }, []);


  return (
    <View style={{alignItems:'center', bottom:'3%' }}>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Text style={styles.title}>Controller page</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

              {/* CONTROL ROVER WITH ARROW KEYS */}
        <Text style={styles.title}> Remote Control for rover to move: {joystickDirection}</Text>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

      <View style={styles.main}>

        {/* LEFT */}
        <View style={{width:'50%', paddingLeft:'5%'}}>

          {/* ROVER */}
          <View style={styles.row}>
            <GiMarsCuriosity color="white" size={'90%'} />

            <View style={{width:'35%'}}>
              <div style={{paddingLeft:70, paddingBottom:20}}>
                <Text style={styles.title}>Motors:</Text>
              </div>

              <div style={{ paddingLeft: 30, paddingRight: 30, paddingBottom: 15  }}>
                <GiCartwheel color="white" size={'35%'} />
                <Bulb size={10} color={leftColour} style={{ padding: 10 }} />
                <Text style={{ color: "white", fontSize: 16, fontWeight: 'bold' }}>  LEFT </Text>

              </div>

              <div style={{ paddingLeft: 30, paddingRight: 30, paddingBottom: 15 }}>
                <GiCartwheel color="white" size={'35%'} />
                <Bulb size={10} color={rightColour} style={{ padding: 10 }} />
                <Text style={{ color: "white", fontSize: 16, fontWeight: 'bold' }}> RIGHT </Text>
              </div>
            </View>

            {/* ORIENTATION ARROW */}
            <View style={{width:'40%'}}>
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

        </View>

        {/* RIGHT */}
        <View style={{width:'50%', paddingRight:'5%'}}>

          {/* Joystick */}
          {/* <View style={{alignItems:'center', height:'30%'}}>
            <TouchableOpacity
              onPress={() => pressDirection("forward")}
              style={styles.roundButton1}
            >
              <Text style={styles.text}>FORWARD</Text>
            </TouchableOpacity>


            <View style={styles.row}>
              <div style={{padding:10}}>
                <TouchableOpacity
                  onPress={() => pressDirection("left")}
                  style={styles.roundButton1}
                >
                  <Text style={styles.text}>LEFT</Text>
                </TouchableOpacity>
              </div>

              <div style={{padding:10}}>
                <TouchableOpacity
                  onPress={() => pressDirection("right")}
                  style={styles.roundButton1}
                >
                  <Text style={styles.text}>RIGHT</Text>
                </TouchableOpacity>
              </div>
            </View>

            <TouchableOpacity
              onPress={() => pressDirection("backwards")}
              style={styles.roundButton1}
            >
              <Text style={styles.text}>BACK</Text>
            </TouchableOpacity>
          </View> */}

          {/* GRAPH */}
          <View style={{padding: 10}}>
            <View style={styles.row}>
              <View style={{ width: '90%', backgroundColor: 'white', padding: 5, height:300, justifyContent: 'center' }}>
                <LineGraph chartData={motorSpeed} />
              </View>
              <View style={{ padding: 10 }}>
                <TouchableOpacity onPress={connect} style={[styles.roundButton1,{right:5}]}>
                  <Text style={styles.text}>Update Motors</Text></TouchableOpacity>
              </View>
            </View>
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
    flex: 2,
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
    marginVertical: 20,
    height: 1,
    width: '80%',
  },
  roundButton1: {
    width: 72,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 50,
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
