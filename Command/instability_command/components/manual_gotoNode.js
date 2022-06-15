import React, { memo, useState } from 'react';

import { Handle } from 'react-flow-renderer';
import { Text, View, TextInput } from 'react-native';

var sizePos = 9;

let path = 'd:/2_Work/Y2_courseworks/Instability_Rover/Instability/Command/'


export default memo(({selected, isConnectable, xPos, yPos, hidden}) => {

    // ASK FOR COORDS TO MOVE TO______________________________________________________________________________
    const [xCoord, setXCoord] = useState(xPos)
    const [yCoord, setYCoord] = useState(yPos)
    const [confirm, setConfirm] = useState(false)

  const moveto = () => {
    hidden = true;
    
    var xhr = new XMLHttpRequest()
    console.log("sending to /moveto...", xCoord, yCoord)
    // get a callback when the server responds
    xhr.addEventListener('load', () => {
      // update the state of the component with the result here
      console.log(xhr.responseText)
    })
    // open the request with the verb and the url
    // xhr.open('GET', 'https://localhost:8000/moveto')
    // // send the request
    // xhr.send()
    xhr.open('POST', 'https://localhost:8000/moveto')
    xhr.send(
      JSON.stringify({ 
        position: {
          x: xCoord,
          y: yCoord
        }
       })
    )

  }

  return (
    <>

      {
        (!confirm)
        ?
          <div className= "manual_gotoNode" style={{justifyContent:'center'}}>

            <div> Input coords </div>
            
            <TextInput onChangeText={setXCoord}
            value={xCoord}
            placeholder="X"
            keyboardType="numeric"
            maxLength={3} 
            style={{width: 15, maxHeight:15, alignItems:'center', justifyContent:'center', color:'#cfdfda', fontSize:8, fontFamily:'space-mono'}}/>
            <Text style={{color:'#cfdfda', fontSize:8, fontFamily:'space-mono'}}>;</Text>
            <TextInput onChangeText={setYCoord}
            value={yCoord}
            placeholder="Y"
            keyboardType="numeric"
            maxLength={3} 
            style={{width: 15, maxHeight:15, alignItems:'center', justifyContent:'center', color:'#cfdfda', fontSize:8, fontFamily:'space-mono'}}/>

            <div></div>
            <button style={{width: 20, maxHeight:15, alignItems:'center', justifyContent:'center', color:'#4a6c2f', fontSize:8}} 
                    onClick={() => {setConfirm(true)}}>
                  ok</button>
          </div>
        :
          !(selected) 
          ? 
            <div className= "manual_gotoNode">
              <div> -Click to- </div>
              <div> -confirm- </div>
              <div>
                <strong>({xCoord+''};{yCoord+''})</strong>
              </div>
              <div> -or refresh- </div>
            </div>
          :
            <div>
              <div className= "manual_gotoNode">
                <div style={{color:'#cfdfda'}}> {'\n'}-move to- </div>
                <div style={{color:'#cfdfda'}}>
                  <strong>({xCoord+''};{yCoord+''})</strong>
                </div>
                <div style={{color:'#cfdfda'}}> -?- </div>
                <button style={{width: 30, maxHeight:15, alignItems:'center', justifyContent:'center', color:'#4a6c2f', fontSize:8}} onClick={moveto}>
                  yes</button>
              </div>
            </div>
          
      }

    </>
  );
});

