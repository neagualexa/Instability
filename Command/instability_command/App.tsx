import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Text, View, StyleSheet } from 'react-native';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// https://mui.com/material-ui/react-checkbox/

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { width } from '@mui/system';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
        <View style={[styles.floatinBtn]}>
          <FormGroup >
            <FormControlLabel control={<Checkbox 
                                  icon={<Text style={styles.icon}>OFF</Text>} 
                                  checkedIcon={<Text style={[styles.icon_selected]}>ON</Text>} />} 
                              label="Updates" labelPlacement="start" />
          </FormGroup>
        </View>
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  floatinBtn: {
    position: 'absolute',
    top: 63,
    left: 0,
    color:'white',
    backgroundColor:"rgba(18,18,18,0.5)",
    borderColor:"#222223",
    borderWidth:0.1,
    // paddingRight: 20,
    width: 150,
    alignItems:'flex-start',
  },
  icon:{
    backgroundColor:"#121212",
    color:"white",
    width: 40,
    borderColor:"#222223",
    borderWidth: 2,
    textAlign:'center'
  },
  icon_selected:{
    backgroundColor:"#121212",
    color:"white",
    width: 40,
    borderColor:"#f5fbe4",
    borderWidth: 2,
    textAlign:'center'
  }
});
