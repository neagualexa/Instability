import React, { memo } from 'react';

import { Handle } from 'react-flow-renderer';

var sizePos = 8;

export default memo(({selected, isConnectable, xPos, yPos}) => {
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
        style={{ top: sizePos*2, height:5, width:5, background: '#555'  }}
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
              <strong>({xPos+''};{yPos+''})</strong>
            </div>
            <div> - </div>
          </div>
        :
          <div className= "positionNode" style={{background:"yellow"}}>
            <div> -move to- </div>
            <div>
              <strong>({xPos+''};{yPos+''})</strong>
            </div>
            <div> -?- </div>
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
        style={{ top: sizePos*2, height:5, width:5, background: '#555' }}
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

