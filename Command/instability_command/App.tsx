import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Text, View, StyleSheet } from 'react-native';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// https://mui.com/material-ui/react-checkbox/
// import UpdateDisabledIcon from '@mui/icons-material/UpdateDisabled';
// import UpdateIcon from '@mui/icons-material/Update';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

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
        <View style={styles.floatinBtn}>
        <FormGroup >
          {/* <FormControlLabel control={<Checkbox defaultChecked icon={<UpdateDisabledIcon />} checkedIcon={<UpdateIcon />}/>} label="Updates" /> */}
          <FormControlLabel control={<Checkbox defaultChecked />} label="Updates" />
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
    top: 15,
    left: 70,
    color:'white'
  }
});
