import React from "react";
import DeviceConnectToggler from "../../device-connect-toggler";

class GreenLaser extends React.PureComponent {
    constructor(props) {
        super(props);

        this.name = props.name;
        this.sliderId = `${props.name}_power_output_slider`;
        const params = props.params;
        this.title = params.device_title;

        this.state = {
            maxPower: params.max_power,
            minPower: params.min_power,
            outputPower: params.output_power,
            fastAOMSwitch: params.fastAOMSwitch,
            isOpened: params.isOpened,
            enabled: params.isOpened,
            userInputActive: false
        };
        this.toggleFastAOMSwitch = this.toggleFastAOMSwitch.bind(this);
        this.setPowerOutput = this.setPowerOutput.bind(this);
        this.handleSlider = this.handleSlider.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.handleKeyPressed = this.handleKeyPressed.bind(this);
    }

    toggleFastAOMSwitch() {
        const fastAOMSwitchState = this.state.fastAOMSwitch;
        this.props.callDeviceCommand(this.name, 'set_fast_aom_switch', !fastAOMSwitchState);
    }

    setPowerOutput(event) {
        this.props.callDeviceCommand(this.name, 'set_output_power', event.target.value);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (this.state.userInputActive) {
            return;
        }

        const params = nextProps.params;

        if (params.state) {
            this.setState({
                isOpened: params.isOpened,
                enabled: params.isOpened,
                fastAOMSwitch: params.fastAOMSwitch,
                outputPower: parseFloat(params.state.output_power)
            });
        }
    }

    handleSlider(event) {
        this.setState({
            outputPower: parseFloat(event.target.value),
        });
    }

    onBlur() {
        this.setState({
            userInputActive: false
        });
        this.props.callDeviceCommand(this.name, 'set_output_power', this.state.outputPower);
    }

    onFocus() {
        this.setState({
            userInputActive: true
        });
    }

    handleKeyPressed(event) {
        switch (event.which) {
            case 13: //Enter
            case 27: //Escape
                document.getElementById(this.sliderId).blur();
                event.preventDefault();
                break;
        }
    }

    render() {
        const fastAOMSwitchId = `${this.name}_fast_aom_switch`;
        const step = (this.state.maxPower - this.state.minPower) / 50;

        return (
            <div className={"laser"}>
                <article className="message is-info">
                    <div className="message-header">
                        {this.title}
                        <DeviceConnectToggler
                            deviceName={this.name}
                            title={this.title}
                            isOpened={this.state.isOpened}
                            releaseDevice={this.props.releaseDevice}
                            openDevice={this.props.openDevice}
                        />
                        <button className={"delete"} onClick={() => {this.props.minimize(this.name)}}/>
                    </div>
                </article>

                <div className="field">
                    <input
                        id={fastAOMSwitchId}
                        type={"checkbox"}
                        name={fastAOMSwitchId}
                        checked={this.state.fastAOMSwitch}
                        className={"switch is-rounded"}
                        onChange={this.toggleFastAOMSwitch}
                        disabled={!this.state.enabled}
                    />
                    <label htmlFor={fastAOMSwitchId}>
                        {"Fast AOM switch"}
                    </label>
                </div>

                <div className={"field is-horizontal"}>
                    <div className={"field-body is-narrow"}>
                        <div className={"field"}>
                            <input
                                id={this.sliderId}
                                className="slider is-fullwidth is-danger is-active"
                                step={step}
                                min={this.state.minPower}
                                max={this.state.maxPower}
                                value={this.state.outputPower}
                                disabled={!this.state.enabled}
                                type={"range"}
                                onBlur={this.onBlur}
                                onFocus={this.onFocus}
                                onChange={this.handleSlider}
                                onKeyDown={this.handleKeyPressed}
                            />
                        </div>

                        <div className={"field"}>
                            <strong
                                className={"tag"}>
                                {`${this.state.outputPower.toFixed(1)} V`}
                            </strong>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default GreenLaser;
