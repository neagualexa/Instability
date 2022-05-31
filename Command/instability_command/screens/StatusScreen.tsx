import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

import { Wifi } from '../components/wifi'
import '../components/wifi.styles.css'
import BatteryGauge from 'react-battery-gauge'

export default function StatusScreen() {
  return (
    <View style={styles.container}>

      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Text style={styles.title}>Status ESP32</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <View style={{flexDirection:'row'}}>
        <View style={{alignItems:'center'}}>
          <Text style={styles.title}>Wifi connection</Text>
          <Wifi status="search" width={"70"} height={"auto"} /> {/* search, good-connection, fair-connection, poor-connection, error */}
        </View>
        
        <Text>{'\t\t\t'}</Text>
        <View style={{alignItems:'center'}}>
          <Text style={styles.title}>Battery level</Text>
          <BatteryGauge value={40} padding={12} customization={batteryCustom} /> {/* https://npm.io/package/react-battery-gauge */}
        </View>
      </View>


      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Text style={styles.title}>Status SENSORS</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <View style={{flexDirection:'row'}}>
        
      </View>

    </View>
  );
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
    "fontSize": 10
  }
}