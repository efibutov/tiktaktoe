import React from "react";

const plotStyles = ["Normal", "Equal", "Square"];
const plotStyleOptions = plotStyles.map(
    style => <option key={style} value={style}>{style}</option>
);
const colorMaps = [
    "Pink",
    "Parula",
    "HSV",
    "Hot",
    "Cool",
    "Spring",
    "Summer",
    "Autumn",
    "Winter",
    "Gray",
    "Bone",
    "Copper",
    "Lines"
];
const colorMapOptions = colorMaps.map(
    colorMap => <option key={colorMap} value={colorMap}>{colorMap}</option>
);
const graphStyles = [
    "contour",
    "surface",
    "heatmap",
    "heatmapgl",
    "scatter",
    "scatter3d",
    "carpet",
    "barpolar"
];
const graphStyleOptions = graphStyles.map(
    colorMap => <option key={colorMap} value={colorMap}>{colorMap}</option>
);


export {graphStyleOptions, plotStyleOptions, colorMapOptions, plotStyles, colorMaps, graphStyles};
