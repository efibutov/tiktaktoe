import React from "react";
import Toggler from "../gui-elements/toggler";

function MiscControls (props) {
    const name = props.name;
    const continuousBoxId = `${name}_continuousBox`;
    const fastScanBoxId = `${name}_fastScanBox`;
    const autoSaveBoxId = `${name}_autoSaveBoxId`;
    const closedLoopBoxId = `${name}_closedLoopBoxId`;

    return (
        <div className={"scan"}>
            <a className="panel-block">
                <div className={"field is-horizontal"}>
                        <div className={"field-label is-normal"}>
                            <span className="icon has-text-info is-primary tooltip" data-tooltip="Time pixel">
                                <ion-icon name={"stopwatch"}/>
                            </span>
                        </div>

                        <div className={"field-body"}>
                            <div className={"field"}>
                                <input
                                    className={"input"}
                                    style={{width: "70px"}}
                                    type={"number"}
                                    step={1}
                                    min={props.minPixelTime}
                                    max={props.maxPixelTime}
                                    value={props.pixelTime}
                                    onChange={props.setPixelTime}
                                />
                            </div>
                        </div>
                    </div>
            </a>
            <a className="panel-block">
                <Toggler
                    iconName={"infinite"}
                    toolTip={"Continuous"}
                    label={""}
                    callback={props.setContinuous}
                    id={continuousBoxId}
                    isChecked={props.continuous}
                />
            </a>
            <a className="panel-block">
                <Toggler
                    iconName={"fastforward"}
                    toolTip={"Fast scan"}
                    label={""}
                    callback={props.setFastScan}
                    id={fastScanBoxId}
                    isChecked={props.fastScan}
                />
            </a>
            <a className="panel-block">
                <Toggler
                    iconName={"save"}
                    toolTip={"Auto save"}
                    label={""}
                    callback={props.setAutoSave}
                    id={autoSaveBoxId}
                    isChecked={props.autoSave}
                />
            </a>
            <a className="panel-block">
                <Toggler
                    id={closedLoopBoxId}
                    iconName={"git-compare"}
                    toolTip={"Closed loop"}
                    label={""}
                    callback={props.setClosedLoop}
                    isChecked={props.closedLoop}
                />
            </a>
        </div>
    );
}

export default MiscControls;
