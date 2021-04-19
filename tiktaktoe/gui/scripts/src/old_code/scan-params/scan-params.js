import React from "react";
import AxisField from "./axis-field";
import MiscControls from "./misc-controls";
import ToggleScanButton from "./toggle-scan-button";

class ScanParams extends React.PureComponent {
    constructor(props) {
        super(props);

        this.name = props.name;
        this.state = {
            closedLoop: props.closedLoop,
            autoSave: props.autoSave,
            fastScan: props.fastScan,
            continuous: props.continuous,
            pixelTime: props.pixelTime,
            isScanning: props.isScanning,
            axes: {
                x: undefined,
                y: undefined,
                z: undefined
            },
        };
        this.setScanParams = this.setScanParams.bind(this);
        this.setPixelTime = this.setPixelTime.bind(this);
        this.setFastScan = this.setFastScan.bind(this);
        this.setAutoSave = this.setAutoSave.bind(this);
        this.setContinuous = this.setContinuous.bind(this);
        this.setNumOfPoints = this.setNumOfPoints.bind(this);
        this.setScanMin = this.setScanMin.bind(this);
        this.setScanMax = this.setScanMax.bind(this);
        this.setClosedLoop = this.setClosedLoop.bind(this);
        this.resetStage = this.resetStage.bind(this);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        const scanParams = nextProps.scanParams;
        if (!scanParams) {
            return;
        }
        const axes = scanParams.axes;
        try {
            if (scanParams) {
            this.setState({
                isScanning: nextProps.isScanning,
                closedLoop: scanParams.closed_loop,
                pixelTime: scanParams.pixel_time,
                minPixelTime: scanParams.min_pixel_time,
                maxPixelTime: scanParams.max_pixel_time,
                continuous: scanParams.continuous,
                fastScan: scanParams.fast_scan,
                autoSave: scanParams.auto_save,
                axes: {
                    x: axes.x,
                    y: axes.y,
                    z: axes.z,
                }
            });
        }
        }
        catch (e) {
            console.log(e);
        }
    }

    setScanParams(axisName, member, value) {
        const axes = this.state.axes;
        axes[axisName][member] = value;

        this.setState({
            axes: axes
        });
    }

    setNumOfPoints(axisName, points) {
        const newPoints = Number(points);

        if (!isNaN(newPoints)) {
            this.setScanParams(axisName, "points", newPoints);
        }
    }

    setScanMin(axisName, newMin) {
        const numberMin = Number(newMin);
        console.log(numberMin);

        if (!isNaN(numberMin)) {
            this.setScanParams(axisName, "min", numberMin);
        }
    }

    setScanMax(axisName, newMax) {
        if (newMax) {
            const numberMax = Number(newMax);
            console.log(numberMax);

            if (!isNaN(numberMax)) {
                this.setScanParams(axisName, "max", numberMax);
            }
        }
    }

    setPixelTime(e) {
        this.setState({
            pixelTime: e.target.value
        });
    }

    setClosedLoop() {
        const closedLoop = this.state.closedLoop;

        this.setState({
            closedLoop: !closedLoop
        });
    }

    setContinuous() {
        const continuous = this.state.continuous;
        this.setState({
            continuous: !continuous
        });
    }

    setFastScan() {
        const fastScan = this.state.fastScan;

        this.setState({
            fastScan: !fastScan
        });
    }

    setAutoSave() {
        const autoSave = this.state.autoSave;

        this.setState({
            autoSave: !autoSave
        });
    }

    resetStage() {
        console.log("RESET STAGE");
    }

    render() {
        const state = this.state;
        const axes = state.axes;
        if (axes.x === undefined || axes.y === undefined || axes.z === undefined) {
            return (<div/>);
        }

        const axisData = [];

        for(let axisLetter in this.state.axes) {
            axisData.push(
                <a className="panel-block" key={axisLetter}>
                    <AxisField
                        params={axes[axisLetter]}
                        axisName={axisLetter}
                        setNumOfPoints={this.setNumOfPoints}
                        setScanMin={this.setScanMin}
                        setScanMax={this.setScanMax}
                    />
                </a>
            )
        }

        return (
            <div className={"scan-params"}>
                <article className="message is-grey-dark">
                    <div className="message-header">
                        {"Scan params"}
                        <ToggleScanButton
                            isScanning={this.state.isScanning}
                            startScanning={this.props.startScanning}
                            stopScanning={this.props.stopScanning}
                        />
                        <button
                            className={"button is-black tooltip"}
                            data-tooltip={"Reset stage"}
                            onClick={this.resetStage}
                        >
                            <span>{"Reset stage"}</span>
                            <span className="icon has-text-info is-primary">
                                <ion-icon name={"refresh"}/>
                            </span>
                        </button>
                        <button
                            className={"button is-info is-rounded"}
                            onClick={() => {this.props.setScanParams(this.state)}}
                        >
                            <span className="icon is-small">
                                <ion-icon name="checkmark-circle"/>
                            </span>
                            <span>{"Apply"}</span>
                        </button>

                        <button className={"delete"} onClick={() => {
                            this.props.minimizeElement(this.name)
                        }}/>
                    </div>
                </article>

                <div className={"field is-horizontal"}>
                    <div className={"field-body"}>
                        <div className={"field"}>
                            <nav className="panel">
                                {axisData}
                            </nav>
                        </div>
                        <div className={"field"}>
                            <nav className="panel">
                                <MiscControls
                                    pixelTime={state.pixelTime}
                                    minPixelTime={state.minPixelTime}
                                    maxPixelTime={state.maxPixelTime}
                                    setPixelTime={this.setPixelTime}

                                    continuous={state.continuous}
                                    setContinuous={this.setContinuous}

                                    fastScan={state.fastScan}
                                    setFastScan={this.setFastScan}

                                    autoSave={state.autoSave}
                                    setAutoSave={this.setAutoSave}

                                    closedLoop={state.closedLoop}
                                    setClosedLoop={this.setClosedLoop}
                                />
                            </nav>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default ScanParams;
