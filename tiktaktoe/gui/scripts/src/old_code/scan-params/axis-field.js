import React from "react";


class AxisField extends React.Component {
    constructor(props) {
        super(props);

        this.axisName = props.axisName;
        this.state = {
            min: props.min,
            max: props.max,
            points: Number(props.points),
        };
        this.setNumOfPoints = this.setNumOfPoints.bind(this);
        this.setScanMin = this.setScanMin.bind(this);
        this.setScanMax = this.setScanMax.bind(this);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        // console.log(nextProps);
        this.setState({
            min: nextProps.params.min,
            max: nextProps.params.max,
            points: nextProps.params.points
        });
    }

    setNumOfPoints(event) {
        const numOfPoints = event.target.value;
        this.setState({
            points: numOfPoints
        });
        this.props.setNumOfPoints(this.axisName, numOfPoints);
    }

    setScanMin(event) {
        const newMin = event.target.value;
        this.setState({
            min: newMin
        });
        this.props.setScanMin(this.axisName, newMin);
    }

    setScanMax(event) {
        const newMax = event.target.value;
        this.setState({
            max: newMax
        });
        this.props.setScanMax(this.axisName, newMax);
    }

    render() {
        const min = this.state.min;
        const max = this.state.max;
        const points = this.state.points;

        if(min === undefined || max === undefined || points === undefined){
            return (<div/>);
        }

        return (
            <div className={"field is-horizontal"}>
                <div className={"field-body is-narrow"}>

                    {/*Axis Tag*/}
                    <div className={"field"}>
                        <span className="tag is-dark is-medium">
                            <strong>{this.axisName.toUpperCase()}</strong>
                        </span>
                    </div>

                    <div className={"field-label is-normal"}>
                        <strong>{"Lower"}</strong>
                    </div>

                    {/*Lower limit input box*/}
                    <div className={"field tooltip"} data-tooltip={`Lower ${this.axisName.toUpperCase()} limit`}>
                        <input
                            className={"input"}
                            type={"text"}
                            value={min}
                            onChange={this.setScanMin}
                        />
                    </div>

                    <div className={"field-label is-normal"}>
                        <strong>{"Upper"}</strong>
                    </div>

                    {/*Upper axis bound*/}
                    <div className={"field tooltip"} data-tooltip={`Upper ${this.axisName.toUpperCase()} limit`}>
                        <input
                            className={"input"}
                            type={"text"}
                            value={max}
                            onChange={this.setScanMax}
                        />
                    </div>

                    <div className={"field-label is-normal"}>
                        <strong>{"Points"}</strong>
                    </div>

                    {/*Upper axis bound*/}
                    <div className={"field tooltip"} data-tooltip={`Num of points ${this.axisName.toUpperCase()}`}>
                        <input
                            className={"input"}
                            type={"number"}
                            value={points}
                            min={1}
                            onChange={this.setNumOfPoints}
                        />
                    </div>

                </div>
            </div>
        );
    }
}

export default AxisField;
