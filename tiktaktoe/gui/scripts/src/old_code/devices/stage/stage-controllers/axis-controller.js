import React from "react";
import InputBox from "./input-box";

class AxisController extends React.Component {
    constructor(props) {
        super(props);

        this.axisName = props.axisName;
        this.state = {
            enabled: props.enabled,
            current: props.current,
            min: props.min,
            max: props.max,
            step: props.step,
        };
        this.getNewCoordinateTooltip = this.getNewCoordinateTooltip.bind(this);
        this.calculateNewCoordinate = this.calculateNewCoordinate.bind(this);
        this.setLowerBoundary = this.setLowerBoundary.bind(this);
        this.setHigherBoundary = this.setHigherBoundary.bind(this);
        this.setCurrentPosition = this.setCurrentPosition.bind(this);
        this.setAttribute = this.setAttribute.bind(this);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        const data = nextProps.data;
        this.setState({
            current: data.current,
            step: nextProps.step,
            min: data.sw_lower,
            max: data.sw_upper,
            enabled: nextProps.enabled,
        });
    }

    setCurrent(newCurrent) {
        this.props.setCoordinate(
            this.axisName,
            this.calculateNewCoordinate(newCurrent)
        );
    }

    calculateNewCoordinate(delta) {
        let newValue = this.state.current + delta;

        if (newValue > this.state.max) {
            newValue = this.state.max;
        }
        else if (newValue < this.state.min) {
            newValue = this.state.min;
        }

        return newValue;
    }

    getNewCoordinateTooltip(delta) {
        return `New ${this.axisName} = ${this.calculateNewCoordinate(delta).toFixed(2)}`;
    }

    setAttribute(attribute, e){
        const value = e.target.value;

        if (value.length !== 0) {
            const numValue = Number(value);

            if (!isNaN(numValue)) {
                this.setState({
                    [attribute]: numValue
                });
            }
        }
    }

    setLowerBoundary(e) {
        this.setAttribute("min", e);
    }

    setCurrentPosition(e) {
        this.setAttribute("current", e);
    }

    setHigherBoundary(e) {
        this.setAttribute("max", e);
    }

    render() {
        const min = this.state.min;
        const max = this.state.max;
        const current = this.state.current;
        const step = this.state.step;
        const axisName = this.axisName;
        const edgeButtonStyle = "button is-danger is-rounded";
        const buttonStyle = "button is-info is-rounded";
        const enabled = this.state.enabled;

        if (
            min === undefined ||
            max === undefined ||
            current === undefined ||
            axisName === undefined ||
            step === undefined
        )
        {
            return (<div/>);
        }

        return (
            <div className={"field is-horizontal"}>
                <div className={"field-body is-narrow"}>
                    <div className={"field"}>
                        <span className="tag is-dark is-medium">
                            <strong>{axisName.toUpperCase()}</strong>
                        </span>
                    </div>

                    <div className={"field-label is-normal"}>
                        <strong>{"Lower"}</strong>
                    </div>

                    <InputBox
                        enabled={enabled}
                        value={this.state.min}
                        setValue={this.setLowerBoundary}
                    />

                    {/*Rewind button*/}
                    <div className="field">
                        <button
                            className={edgeButtonStyle}
                            disabled={current <= min || !enabled}
                            onClick={() => {this.setCurrent(-10 * step)}}
                        >
                            <span
                                className="icon tooltip"
                                data-tooltip={this.getNewCoordinateTooltip(-10 * step)}
                            >
                                <ion-icon name="rewind"/>
                            </span>
                        </button>
                    </div>

                    {/*Backward button*/}
                    <div className="field">
                        <button
                            className={buttonStyle}
                            disabled={current <= min || !enabled}
                            onClick={() => {this.setCurrent(-step)}}
                        >
                            <span
                                className="icon tooltip"
                                data-tooltip={this.getNewCoordinateTooltip(-step)}
                            >
                                <ion-icon name="skip-backward"/>
                            </span>
                        </button>
                    </div>

                    <InputBox
                        enabled={enabled}
                        value={this.state.current}
                        setValue={this.setCurrentPosition}
                    />

                    {/*Skip forward button*/}
                    <div className="field">
                        <button
                            className={buttonStyle}
                            disabled={current >= max || !enabled}
                            onClick={() => {this.setCurrent(step)}}
                        >
                           <span
                               className="icon tooltip"
                               data-tooltip={this.getNewCoordinateTooltip(step)}
                           >
                               <ion-icon name="skip-forward"/>
                           </span>
                        </button>
                    </div>

                    {/*Fast forward button*/}
                    <div className="field">
                        <button
                            className={edgeButtonStyle}
                            disabled={current >= max  || !enabled}
                            onClick={() => {this.setCurrent(10 * step)}}
                        >
                            <span
                                className="icon tooltip"
                                data-tooltip={this.getNewCoordinateTooltip(10 * step)}
                            >
                                <ion-icon name="fastforward"/>
                            </span>
                        </button>
                    </div>

                    <div className={"field-label is-normal"}>
                        <strong>
                            {"Upper"}
                        </strong>
                    </div>

                    <InputBox
                        enabled={enabled}
                        value={this.state.max}
                        setValue={this.setHigherBoundary}
                    />
                </div>
            </div>
        );
    }
}

export default AxisController;
