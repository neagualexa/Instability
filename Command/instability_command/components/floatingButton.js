import { Text, View, StyleSheet } from 'react-native';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// https://mui.com/material-ui/react-checkbox/
import { BsToggleOff, BsToggleOn } from "react-icons/bs";

import { useState, useCallback } from 'react';

export var checkState = false;

export default function FloatingButton() {

    const [checked, setChecked] = useState(true);
    // checkState = checked;

    return(
        <View>
            <FormGroup >
                <FormControlLabel control={<Checkbox 
                                    icon={<BsToggleOff style={styles.icon} size={30}/>} 
                                    checkedIcon={<BsToggleOn style={styles.icon} size={30}/>} 
                                    color="default" 
                                    />} 
                                label="Updates" labelPlacement="start"  
                                onChange={() => {setChecked(!checked); 
                                                checkState = checked; 
                                                // console.log(checkState, " & check:", checked)
                                                }}/>
            </FormGroup>
        </View>
    );
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
  