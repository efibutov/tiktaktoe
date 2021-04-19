import React from "react";

class Confirm extends React.PureComponent {
    constructor(props) {
        super(props);
        this.title = props.title;
        this.state = {
            isOpen: props.isOpen
        };
        this.onEscape = this.onEscape.bind(this);
    }

    onEscape({keyCode}) {
        if (keyCode === 27) {
            this.props.confirmClosing(false);
        }
    }

    componentDidMount() {
        document.addEventListener('keydown', this.onEscape);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.onEscape);
    }

    render() {
        const title = this.state.isOpen ? `Close the ${this.title}?` : `Open the ${this.title}?`;

        return (
            <div className="modal is-active">
                <div className="modal-background"/>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">
                            {title}
                        </p>
                        <button
                            className="delete"
                            aria-label="close"
                            onClick={() => this.props.confirmToggle(false)}

                        />
                    </header>
                    <footer className="modal-card-foot">
                        <button
                            className={"button is-danger"}
                            onClick={() => this.props.confirmToggle(true)}
                        >
                            {"Yes"}
                        </button>
                        <button
                            className={"button"}
                            onClick={() => this.props.confirmToggle(false)}
                        >
                            {"Cancel"}
                        </button>
                    </footer>
                </div>
            </div>
        )
    }
}

class DeviceConnectToggler extends React.PureComponent {
    constructor(props) {
        super(props);

        this.deviceName = props.deviceName;
        this.title = props.title;
        this.state = {
            isOpened: props.isOpened,
            confirmDialogOpen: false,
        };

        this.confirmToggle = this.confirmToggle.bind(this);
        this.openDialog = this.openDialog.bind(this);
    }

    confirmToggle(userResponse) {
        if (userResponse) {
            if (this.state.isOpened) {
                this.props.releaseDevice(this.deviceName);
            }
            else {
                this.props.openDevice(this.deviceName);
            }
        }

        this.setState({
            confirmDialogOpen: false
        });
    }

    openDialog() {
        this.setState({
            confirmDialogOpen: true
        })
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            isOpened: nextProps.isOpened
        });
    }

    render() {
        if (this.state.isOpened === undefined || !this.title || !this.deviceName) {
            return (<div/>);
        }
        const label = this.state.isOpened ? "Close" : "Open";
        const checkBoxId = `release_${this.deviceName}`;
        const toggler = (
            <div className="field">
                <input
                    id={checkBoxId}
                    type={"checkbox"}
                    name={checkBoxId}
                    checked={this.state.isOpened}
                    className={"switch is-rounded"}
                    onChange={this.openDialog}
                />
                <label htmlFor={checkBoxId} className={"white-label"}>
                    {label}
                </label>
            </div>
        );

        if (this.state.confirmDialogOpen) {
            return (
                <div>
                    <Confirm
                        confirmToggle={this.confirmToggle}
                        isOpen={this.state.isOpened}
                        title={this.title}
                    />
                    <div>{toggler}</div>
                </div>

            );
        }
        else {
            return (
                <div>
                    {toggler}
                </div>
            );
        }
    }
}

export default DeviceConnectToggler;
