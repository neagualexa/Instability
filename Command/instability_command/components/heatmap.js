import React from "react";
import { HeatMapGrid } from "react-grid-heatmap";
import { useState, useEffect, useCallback } from "react"

const xLabels = new Array(24).fill(0).map((_, i) => `${i}`);
const yLabels = new Array(36).fill(0).map((_, i) => `${i}`);
// const data = new Array(yLabels.length)
//   .fill(0)
//   .map(() =>
//     new Array(xLabels.length)
//       .fill(0)
//       .map(() => Math.floor(Math.random() * 5 + 5))
//   );
// OR
// const dataRadar = [[0, 0, 0], [1, 3]]


const Heatmap = (data) => {

    const [heatmapData, setheatmapData] = useState(data)

    return (
        <div
            style={{
                width: "100%",
                fontFamily: "sans-serif"
            }}
        >
            <HeatMapGrid
                data={heatmapData}
                xLabels={xLabels}
                yLabels={yLabels}
                // Reder cell with tooltip
                cellRender={(x, y, value) => (
                    <div title={`Pos(${x}, ${y}) = ${value}`}>{value}</div>
                )}
                xLabelsStyle={index => ({
                    color: index % 2 ? "transparent" : "#777",
                    fontSize: ".5rem"
                })}
                yLabelsStyle={() => ({
                    fontSize: ".5rem",
                    // textTransform: "uppercase",
                    color: "#777"
                })}
                cellStyle={(_x, _y, ratio) => ({
                    background: `rgb(12, 160, 44, ${ratio})`,
                    fontSize: ".2rem",
                    color: `rgb(0, 0, 0, ${ratio / 2 + 0.4})`
                })}
                cellHeight="0.7rem"
                xLabelsPos="bottom"
                // onClick={(x, y) => alert(`Clicked (${x}, ${y})`)}
            // yLabelsPos="right"
            // square
            />
        </div>
    );
};

export default Heatmap;
