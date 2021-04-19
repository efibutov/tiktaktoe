import React from "react";
import Toggler from "../../../gui-elements/toggler";

class TiltCorrection extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            theta_xz: props.tiltCorrection.theta_xz,
            theta_yz: props.tiltCorrection.theta_yz,
            enabled: props.tiltCorrection.enabled,
            isDeviceOpen: props.isDeviceOpen
        };
        this.setEnabled = this.setEnabled.bind(this);
        this.setThetaXZ = this.setThetaXZ.bind(this);
        this.setThetaYZ = this.setThetaYZ.bind(this);
        this.calculate = this.calculate.bind(this);
    }

    setEnabled() {
        const enabled = this.state.enabled;
        this.setState({
            enabled: !enabled
        });
    }

    setThetaXZ(e) {
        this.props.setTiltCorrection("theta_xz", Number(e.target.value));
    }

    setThetaYZ(e) {
        this.props.setTiltCorrection("theta_yz", Number(e.target.value));
    }

    componentWillReceiveProps(nextProps, nextContext) {
        const tiltCorrection = nextProps.tiltCorrection;
        this.setState({
            theta_xz: tiltCorrection.theta_xz,
            theta_yz: tiltCorrection.theta_yz,
            enabled: tiltCorrection.enabled,
            isDeviceOpen: nextProps.isDeviceOpen
        });
    }

    calculate() {
        console.log("CALCULATOR");
    }

    render() {
        const enabled = this.state.enabled;
        const thetaXZ = this.state.theta_xz;
        const thetaYZ = this.state.theta_yz;
        const isDeviceOpen = this.state.isDeviceOpen;
        const disabled = !(enabled && isDeviceOpen);

        if (enabled === undefined || thetaXZ === undefined || thetaYZ === undefined || isDeviceOpen === undefined) {
            return (<div/>);
        }

        return (
            <a className={"panel-block"}>
            <nav className="panel">
                <div className={"field is-horizontal"}>
                    <div className="field-body is-narrow">
                        <div className={"field"}>
                            <span className="tag is-warning is-medium">
                                <strong>{"Tilt correction"}</strong>
                            </span>
                        </div>
                        <div className={"field"}>
                            <Toggler
                                iconName={""}
                                toolTip={"Enable"}
                                label={"Enable"}
                                callback={this.setEnabled}
                                id={"enabled"}
                                isChecked={this.state.enabled}
                            />
                        </div>
                        <div className={"field"}>
                            <button
                                className={"button is-dark tooltip"}
                                data-tooltip={"Calculator"}
                                onClick={this.calculate}
                                disabled={disabled}
                            >
                                <span className="icon is-small">
                                    <ion-icon name="calculator"/>
                                </span>
                            </button>
                        </div>

                        <div className={"field-label"}>
                            <strong>Θ<sub>xz</sub></strong>
                        </div>
                        <div className={"field"}>
                            <input
                                className={"input stepbox"}
                                type={"number"}
                                value={thetaXZ}
                                onChange={this.setThetaXZ}
                                step={0.1}
                                disabled={disabled}
                            />
                        </div>

                        <div className={"field-label"}>
                            <strong>Θ<sub>yz</sub></strong>
                        </div>
                        <div className={"field"}>
                            <input
                                className={"input stepbox"}
                                type={"number"}
                                value={thetaYZ}
                                onChange={this.setThetaYZ}
                                step={0.1}
                                disabled={disabled}
                            />
                        </div>
                    </div>
                </div>
            </nav>
            </a>
        );
    }
}

export default TiltCorrection;
