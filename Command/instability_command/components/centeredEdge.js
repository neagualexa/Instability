import React from 'react';
import { getBezierPath, getMarkerEnd } from 'react-flow-renderer';

export default function CustomEdge({ id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    style = {},
    data,
    markerEnd,
}) {

    var centeredSourceX = sourceX - 25;
    var centeredSourceY = sourceY - 25;
    var centeredTargetX = targetX - 25;
    var centeredTargetY = targetY - 25;

    const edgePath = getBezierPath({
        centeredSourceX,
        centeredSourceY,
        centeredTargetX,
        centeredTargetY,
    });

    return (
        <>
            <path
                // id={id}
                // style={style}
                className="react-flow__edge-path"
                d={edgePath}
                // markerEnd={markerEnd}
            />
        </>
    );
}
