import React, { memo } from 'react';

import { Handle } from 'react-flow-renderer';

export default memo(({xPos, yPos}) => {
  return (
    <>
      	<div className= "obstacleNode">
          <div>
            <strong>Obstacle</strong>
          </div>
          <div>
              <strong>({(xPos.toFixed(2)/4).toFixed(2)+''};{((-1)*yPos.toFixed(2)/4).toFixed(2)+''})</strong>
            </div>
          <div>
            Safety range
          </div>
     	</div>
    </>
  );
});
