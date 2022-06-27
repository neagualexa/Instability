import React, { memo } from 'react';

import { Handle } from 'react-flow-renderer';

export default memo(({xPos, yPos}) => {
  return (
    <>
      	<div className= "alienNode">
          <div>
            <strong>Alien</strong>
          </div>
          <div>
              <strong>({(xPos.toFixed(2)/4).toFixed(2)+''};{'\n'}{((-1)*yPos.toFixed(2)/4).toFixed(2)+''})</strong>
            </div>
     	</div>
    </>
  );
});
