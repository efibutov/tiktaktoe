import React from "react";

function ToggleScanButton(props) {
    let icon = undefined;
    let label = undefined;
    let callback = undefined;

    if (props.isScanning) {
        icon = "pause";
        label = "BREAK SCANNING";
        callback = props.stopScanning;
    }
    else {
        icon = "reverse-camera";
        label = "SCAN";
        callback = props.startScanning;
    }
    return(
        <button
            className={"button is-warning tooltip"}
            data-tooltip={label}
            onClick={callback}
        >
            <span>{label}</span>
            <span className="icon has-text-info is-primary">
                <ion-icon name={icon}/>
            </span>
        </button>
    );
}

export default ToggleScanButton;
