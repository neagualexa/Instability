import React, { memo } from 'react';

import { Handle } from 'react-flow-renderer';
import { Text } from 'react-native';

var sizePos = 7.8;

let path = 'd:/2_Work/Y2_courseworks/Instability_Rover/Instability/Command/'


export default memo(({selected, isConnectable, xPos, yPos}) => {

  const moveto = () => {
    var xhr = new XMLHttpRequest()
    console.log("sending to /moveto...", xPos, yPos)
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
          x: xPos,
          y: yPos
        }
       })
    )

  }

  return (
    <>
    {/* CONNECTORS WORK ANTICLOCKWISE */}
    {/* TOP */}
      <Handle
        type="target"
        position="top"
        id= "top_in"
        style={{ left: sizePos*2, height:5, width:5, background: '#555' }}
        onConnect={(params) => console.log('handle onConnect', params)}
        isConnectable={isConnectable}
      /> 
      <Handle
        type="source"
        position="top"
        id= "top_out"
        style={{ left: sizePos*4, height:5, width:5, background: '#555' }}
        onConnect={(params) => console.log('handle onConnect', params)}
        isConnectable={isConnectable}
      /> 

    {/* RIGHT */}
      <Handle
        type="target"
        position="right"
        id="right_in"
        style={{ top: sizePos*1.4, height:5, width:5, background: '#555'  }}
        onConnect={(params) => console.log('handle onConnect', params)}
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position="right"
        id="right_out"
        style={{ top: sizePos*4, height:5, width:5, background: '#555' }}
        onConnect={(params) => console.log('handle onConnect', params)}
        isConnectable={isConnectable}
      /> 

      {
        !(selected) 
        ? 
          <div className= "positionNode">
            <div> - </div>
            <div>
              <strong>({(xPos.toFixed(2)/4).toFixed(2)+''};{'\n'}{((-1)*yPos.toFixed(2)/4).toFixed(2)+''})</strong>
            </div>
            {/* <div> - </div> */}
            <div> - </div>
          </div>
        :
          <div>
            <div className= "positionNode" style={{background:"#4a6c2f"}}>
              <div style={{color:'#cfdfda'}}> {'\n'}-move to- </div>
              <div style={{color:'#cfdfda'}}>
                <strong>({(xPos.toFixed(2)/4).toFixed(2)+''};{'\n'}{((-1)*yPos.toFixed(2)/4).toFixed(2)+''})</strong>
              </div>
              {/* <div style={{color:'#cfdfda'}}> -?- </div> */}
              <button style={{width: 30, maxHeight:15, alignItems:'center', justifyContent:'center', color:'#4a6c2f', fontSize:8}} onClick={moveto}>
                yes</button>
            </div>
          </div>
          
      }

      {/* BOTTOM */}
      <Handle
        type="source"
        position="bottom"
        id="bottom_out"
        style={{ left: sizePos*2, height:5, width:5, background: '#555'  }}
        onConnect={(params) => console.log('handle onConnect', params)}
        isConnectable={isConnectable}
      />
      <Handle
        type="target"
        position="bottom"
        id="bottom_in"
        style={{ left: sizePos*4, height:5, width:5, background: '#555'  }}
        onConnect={(params) => console.log('handle onConnect', params)}
        isConnectable={isConnectable}
      />

      {/* LEFT */}
      <Handle
        type="source"
        position="left"
        id="left_out"
        style={{ top: sizePos*1.4, height:5, width:5, background: '#555' }}
        onConnect={(params) => console.log('handle onConnect', params)}
        isConnectable={isConnectable}
      />
      <Handle
        type="target"
        position="left"
        id="left_in"
        style={{top: sizePos*4, height:5, width:5, background: '#555' }}
        onConnect={(params) => console.log('handle onConnect', params)}
        isConnectable={isConnectable}
      />
    </>
  );
});

