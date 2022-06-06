import { StyleSheet, TouchableOpacity, Button } from 'react-native';
import { useCallback, useState, useEffect } from 'react';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { GiMarsCuriosity, GiCartwheel } from 'react-icons/gi';
import Bulb from 'react-bulb';
import Arrow from '@elsdoerfer/react-arrow';

// import { useLongPress } from '../components/useLongPress'


export default function ControlScreen({ navigation }: RootTabScreenProps<'Control'>) {

  function pressDirection(direction) {
    console.log('Go ', direction, '!');
  }

  const connect = () => {
    var myRequest = new Request('https://localhost:8000/motors');
    fetch(myRequest)
      .then(function (response) {
        if (!response.ok) {
          throw new Error("HTTPS /motors error, status = " + response.status);
        }
        return response.json();
      })
      .then(function (json) {
        // console.log('START connection read:');
        console.log(json);
        setColour(json);
        return 
        // return (json);
      })
      .catch(function (error) {
        console.log('Error: ' + error.message)
      })
  };

  const [leftColour, setLeft] = useState("red");
  const [rightColour, setRight] = useState("red");

  const setColour = useCallback((json) => {
    if(json.left == 1){
      setLeft("green")
    } else {
      setLeft("red")
    }

    if(json.right == 1){
      setRight("green")
    } else {
      setRight("red")
    }
  },[]);

// TODO: could add another map that shows the real path and a diagram showing the orientation of the robot and which motor is doing what

  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <Text style={styles.title}>Controller page</Text>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

        <View style={styles.row}>
          <GiMarsCuriosity color="white" size={300} /> 

          <View style={styles.container}>
            <Text style={styles.title}>Motors:</Text>
            <div>-</div>
            <div >
              <GiCartwheel color="white" size={50} /> 
              <Bulb size={10} color={leftColour}/>
              <Text style={{color:"white", fontSize:16}}>   LEFT </Text>
              
            </div>

            <div >
              <GiCartwheel color="white" size={50} /> 
              <Bulb size={10} color={rightColour}/>
              <Text style={{color:"white", fontSize:16}}> RIGHT</Text>
            </div>
            
            <button onClick={connect}>Update</button>
          </View>

          <Arrow angle={45} length={100} lineWidth={5} color='red'
                  style={{
                    width: '100px',
                    color: 'red'
                  }}
            />

        </View>
      </View>
      
      <View style={styles.container}>
        <TouchableOpacity
          // onPress={ () => setInterval(() => {
          //   pressDirection("forward 0.1s");
          // }, 100) }
          onPress={() => pressDirection("forward")}
          // onPressIn={ () => setStartLongPress(true)}
          // onPressOut={() => setStartLongPress(false)}
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
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 2,
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
    padding: 10,
    borderRadius: 80,
    backgroundColor: 'white',
    // alignSelf: "flex-start",
  },
  text:{
    textShadowOffset:{ width: 1.2, height: 1.5 },
    textShadowColor:'#8f8f8f',
    // textshadowOpacity: 0.8,
    textShadowRadius: 2.5,
    fontWeight: 'bold',
    fontSize: 14,
    color:'black'
  }
});
