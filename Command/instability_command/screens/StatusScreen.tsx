import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

import { Wifi } from '../components/wifi'
import '../components/wifi.styles.css'

export default function StatusScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab Two</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      
      <Wifi status="search" width={"50"} height={"auto"} />
      <Wifi status="good-connection" width={"50"} height={"auto"} />
      <Wifi status="fair-connection" width={"50"} height={"auto"} />
      <Wifi status="poor-connection" width={"50"} height={"auto"} />
      <Wifi
        status="error"
        width={"50"}
        height={"auto"}
        viewBox="0 0 416 349"
      />


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
