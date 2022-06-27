import React, { memo } from 'react';

var sizePos = 8;

export default memo(({selected, xPos, yPos}) => {
  return (
    <>
        <div className= "pathNode">
            {/* ({xPos.toFixed(5)+''}; {'\n'};{(-1)*yPos.toFixed(5)+''}) */}
        </div>
    </>
  );
});

