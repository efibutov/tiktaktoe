import React from "react";
import AxisController from "./stage-controllers/axis-controller";
import MiscControllers from "./stage-controllers/misc-controllers";
import TiltCorrection from "./stage-controllers/tilt-correction";
import Header from "./stage-controllers/header";

class Stage extends React.Component {
    constructor(props) {
        super(props);

        const params = props.params;
        this.name = props.name;
        this.title = props.params.title;

        this.state = {
            axesData: undefined,
            isOpened: params.isOpened,
            isBlocked: params.isBlocked,
            step: props.step,
            defaultStep: props.default_step,
            tiltCorrection: props.tiltCorrection
        };

        this.setCoordinate = this.setCoordinate.bind(this);
        this.setStep = this.setStep.bind(this);
        this.setTiltCorrection = this.setTiltCorrection.bind(this);
    }

    setStep(newStep) {
        this.props.callDeviceCommand(
            this.name, "set_step", {"new_step": newStep}
        );
    }

    setCoordinate(axisName, coordinate) {
        // console.log(axisName, coordinate);
        this.props.callDeviceCommand(
            this.name,
            "set_coordinate",
            {
                "coordinate": coordinate,
                "axe": axisName,
            }
        );
    }

    setTiltCorrection(angle, value) {
        this.props.callDeviceCommand(
            this.name,
            "set_tilt_correction",
            {[angle]: value}
        );
    }

    componentWillReceiveProps(nextProps, nextContext) {
        // console.log(nextProps);
        const params = nextProps.params;
        const state = params.state;

        if (state) {
            this.setState({
                axesData: state.axes_data,
                step: state.step,
                isOpened: params.isOpened,
                isBlocked: params.isBlocked,
                tiltCorrection: state.tilt_correction
            });
        }
    }

    render() {
        if (!this.state.axesData || !this.name || !this.title) {
            return (<div/>);
        }
        const axesData = [];

        for (let axisName in this.state.axesData) {
            axesData.push(
                <a className={"panel-block"} key={axisName}>
                    <AxisController
                        axisName={axisName}
                        data={this.state.axesData[axisName]}
                        step={this.state.step}
                        setCoordinate={this.setCoordinate}
                        enabled={this.state.isOpened}
                    />
                </a>
            )
        }

        return (
            <div className={"stage"}>
                <Header
                    title={this.title}
                    name={this.name}
                    isOpened={this.state.isOpened}
                    releaseDevice={this.props.releaseDevice}
                    openDevice={this.props.openDevice}
                    minimize={this.props.minimize}
                />

                <nav className="panel">
                    <MiscControllers
                        title={this.title}
                        tiltCorrection={this.state.tiltCorrection}
                        step={this.state.step}
                        setStep={this.setStep}
                        enabled={this.state.isOpened}
                        setTiltCorrection={this.setTiltCorrection}
                        isDeviceOpen={this.state.isOpened}
                    />
                    <TiltCorrection
                        tiltCorrection={this.state.tiltCorrection}
                        setTiltCorrection={this.setTiltCorrection}
                        isDeviceOpen={this.state.isOpened}
                    />
                    {axesData}
                </nav>
            </div>
        );
    }
}

export default Stage;
