import React from "react";
import DebugInfo from "./debug-info";
import ScanImage from "./scan-image/scan-image";
import ScanParams from "./scan-params/scan-params"

function Helpers(props) {
    const helpers = props.helpersElements;
    if (helpers.length === 0) {
        return (<div/>);
    }

    const helpersElements = [];

    for (let i in helpers) {
        let helperName = helpers[i];

        switch (helperName) {
            case "Debug_info":
                helpersElements.push(
                    <DebugInfo
                        key={helperName}
                        minimizeElement={props.minimizeElement}
                        name={helperName}
                    />
                );
                break;
            case "ScanImage":
                helpersElements.push(
                    <ScanImage
                        key={helperName}
                        minimizeElement={props.minimizeElement}
                        name={helperName}
                        saveScanData={props.saveScanData}
                        loadScanData={props.loadScanData}
                        lastPixel={props.lastPixel}
                        scanParams={props.scanParams}
                    />
                );
                break;
            case "ScanParams":
                helpersElements.push(
                    <ScanParams
                        key={helperName}
                        minimizeElement={props.minimizeElement}
                        name={helperName}
                        setScanParams={props.setScanParams}
                        scanParams={props.scanParams}
                        startScanning={props.startScanning}
                        stopScanning={props.stopScanning}
                        isScanning={props.isScanning}
                    />
                );
                break;
        }
    }

    return (
        <div className={"box"}>
            <div className={"columns"}>
                {helpersElements}
            </div>
        </div>
    );
}

export default Helpers;
