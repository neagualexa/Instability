import { StyleSheet, TouchableOpacity, Button } from 'react-native';
import { useState, useEffect } from 'react';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

import { useLongPress } from '../components/useLongPress'



export default function ControlScreen({ navigation }: RootTabScreenProps<'Control'>) {

  function pressDirection(direction) {
    console.log('Go ', direction, '!');
  }

  //REPEATS EVERY 0.1s but does not stop
  // const timerId = setInterval(() => {
  //   console.log('Someone Scheduled me to run every 0.1s');
  // }, 100);
  
  // const [startLongPress, setStartLongPress] = useState(false);

  // useEffect((callback = () => {}, ms = 300) => {
  //   let timerId;
  //   if (startLongPress) {
  //     pressDirection("forward");
  //     timerId = setTimeout(callback, ms);
  //   } else {
  //     clearTimeout(timerId);
  //   }

  //   return () => {
  //     clearTimeout(timerId);
  //   };
  // }, [callback, ms, startLongPress]);

  // const onLongPress = () => {
  //     console.log('longpress is triggered');
  // };

  // const onClick = () => {
  //     console.log('click is triggered')
  // }

  // const defaultOptions = {
  //     shouldPreventDefault: true,
  //     delay: 500,
  // };
  // const longPressEvent = useLongPress(onLongPress, onClick, defaultOptions);


  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <Text style={styles.title}>Tab One testttttsss h</Text>
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
          <Text>FORWARD</Text>
        </TouchableOpacity>


        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => pressDirection("left")}
            style={styles.roundButton1}
          >
            <Text>LEFT</Text>
          </TouchableOpacity>
          
          <Text>     +     </Text>
          
          <TouchableOpacity
            onPress={() => pressDirection("right")}
            style={styles.roundButton1}
          >
            <Text>RIGHT</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => pressDirection("backwards")}
          style={styles.roundButton1}
        >
          <Text>BACK</Text>
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
    marginTop: 20,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  roundButton1: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    backgroundColor: 'orange',
    // alignSelf: "flex-start",
  },
});
