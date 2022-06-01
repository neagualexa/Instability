import { StyleSheet, TouchableOpacity, Button } from 'react-native';
import { useState, useEffect } from 'react';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

// import { useLongPress } from '../components/useLongPress'


export default function ControlScreen({ navigation }: RootTabScreenProps<'Control'>) {

  function pressDirection(direction) {
    console.log('Go ', direction, '!');
  }

// TODO: could add another map that shows the real path and a diagram showing the orientation of the robot and which motor is doing what

  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <Text style={styles.title}>Controller page</Text>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        {/* <EditScreenInfo path="/screens/ControlScreen.tsx" /> */}
        {/* <TouchableOpacity onPress={longPressEvent}>Repeat test</TouchableOpacity> */}
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
