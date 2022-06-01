import React, { memo } from 'react';

var sizePos = 8;

export default memo(({selected, xPos, yPos}) => {
  return (
    <>
        <div className= "pathNode">
            ({xPos+''};{yPos+''})
        </div>
    </>
  );
});

