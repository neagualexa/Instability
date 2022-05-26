import React, { memo } from 'react';

import { Handle } from 'react-flow-renderer';

export default memo(({xPos, yPos}) => {
  return (
    <>
      	<div className= "alienNode">
          <div>
            <strong>Alien Node</strong>
          </div>
          <div>
              <strong>({xPos+''};{yPos+''})</strong>
            </div>
          <div>
            Safety range
          </div>
     	</div>
    </>
  );
});
