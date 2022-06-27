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
              <strong>({xPos.toFixed(2)/4+''};{'\n'}{yPos.toFixed(2)/4+''})</strong>
            </div>
     	</div>
    </>
  );
});
