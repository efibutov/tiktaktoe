import React from "react";

class MiscControllers extends React.Component {
    constructor(props) {
        super(props);

        this.title = props.title;
        this.state = {
            step: props.step,
            enabled: props.enabled
        };

        this.setStep = this.setStep.bind(this);
    }

    setStep(event) {
        let step = Number(event.target.value);
        this.props.setStep(step);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            step: nextProps.step,
            enabled: nextProps.enabled
        });
    }

    render() {
        if (this.state.step === undefined || this.state.enabled === undefined) {
            return (<div/>);
        }
        return (
            <a className="panel-block">
            <div className={"field is-horizontal"}>
                <div className={"field-label is-normal"}>
                    <span className="icon has-text-info is-primary tooltip" data-tooltip="Step">
                        <ion-icon name={"walk"}/>
                    </span>
                </div>

                <div className={"field-body"}>
                    <div className={"field"}>
                        <input
                            className={"input stepbox"}
                            type={"number"}
                            step={0.01}
                            min={0.01}
                            value={this.state.step}
                            disabled={!this.state.enabled}
                            onChange={(e) => this.setStep(e)}
                        />
                    </div>
                </div>

                <div className={"field-body"}>
                    <div className={"field"}>
                        <button
                            className={"button is-dark is-fullwidth is-rounded"}
                            disabled={!this.state.enabled}
                        >
                            <span className="icon tooltip" data-tooltip="Move to">
                                <ion-icon name="skip-forward"/>
                            </span>
                        </button>
                    </div>

                    <div className={"field"}>
                    <button
                        className={"button is-link is-fullwidth tooltip"}
                        data-tooltip={"Current->Fixed"}
                        disabled={!this.state.enabled}
                    >
                        <span className="icon">
                            <ion-icon name="git-pull-request"/>
                        </span>
                    </button>
                </div>

                    <div className={"field"}>
                    <button
                        className={"button is-danger is-fullwidth is-rounded tooltip"}
                        data-tooltip={`Halt ${this.title}`}
                        disabled={!this.state.enabled}
                    >
                        <span className="icon">
                            <ion-icon name="hand"/>
                        </span>
                    </button>
                </div>

                </div>

            </div>
            </a>
        );
    }
}

export default MiscControllers;
