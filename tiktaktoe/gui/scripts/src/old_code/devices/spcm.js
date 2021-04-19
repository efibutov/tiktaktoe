import React from "react";
import {XAxis, YAxis, Tooltip, Area, ComposedChart, Line} from 'recharts';
import DeviceConnectToggler from "./device-connect-toggler";

class SPCMPopOut extends React.Component {
    constructor(props) {
        super(props);

        this.title = props.title;
        this.state = {};
        this.onEscape = this.onEscape.bind(this);
    }

    onEscape({keyCode}) {
        if (keyCode === 27) {
            this.props.close();
        }
    }

    componentDidMount() {
        document.addEventListener('keydown', this.onEscape);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.onEscape);
    }

    render() {
        return (
            <div className="modal modal-full-screen is-active">
                <div className="modal-background"/>
                <div className="modal-content">
                    <header className="modal-card-head">
                        <p className="modal-card-title">
                            {this.props.title}
                        </p>
                        <button
                            className="delete"
                            aria-label="close"
                            onClick={this.props.close}
                        />
                    </header>
                    <footer className="modal-card-foot">
                        <div className="box">
                            {this.props.element}
                        </div>
                    </footer>
                </div>
            </div>
        )
    }
}

class SPCM extends React.Component {
    constructor(props) {
        super(props);

        this.defaultWidth = 330;
        this.defaultHeight = 150;
        this.title = props.title;
        this.name = props.name;

        this.state = {
            buffer: [],
            isOpened: props.isOpened,
            popOut: false,
            screenWidth: this.defaultWidth,
            screenHeight: this.defaultHeight
        };
        this.openPopOut = this.openPopOut.bind(this);
        this.closePopOut = this.closePopOut.bind(this);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        const buffer = JSON.parse(JSON.stringify(this.state.buffer));
        const isOpened = nextProps.params.isOpened;

        if (isOpened !== undefined) {
            this.setState({
                isOpened: nextProps.params.isOpened
            });
        }

        try {
            const lastValue = nextProps.params.state.last_value;
            delete lastValue.timestamp;
            delete lastValue.mean;
            buffer.push(lastValue);

            if (buffer.length >= 30) {
                buffer.shift();
            }

            this.setState({
                buffer: buffer
            });
        } catch (e) {
            // console.log(`SPCM ERROR: ${e}`);
        }
    }

    openPopOut() {
        this.setState({
            popOut: true,
            screenWidth: screen.width,
            screenHeight: screen.height,
        });
    }

    closePopOut() {
        this.setState({
            popOut: false,
            screenWidth: this.defaultWidth,
            screenHeight: this.defaultHeight,
        });
    }

    render() {
        const buffer = this.state.buffer;
        let element = undefined;

        if (buffer.length === 0) {
            element = <div>{"No data to present"}</div>;
        }
        else {
            element = (
                <ComposedChart
                    width={this.state.screenWidth}
                    height={this.state.screenHeight}
                    data={buffer}
                    margin={{top: 20, right: 20, bottom: 20, left: 20,}}
                >
                    <XAxis dataKey="x"/>
                    <YAxis type="number" domain={[45, 55]}/>
                    <Area dataKey="y" stroke="#8884d8" fill="#8884d8" fillOpacity={0.5}/>
                    <Line type="monotone" dataKey="mean" stroke="#ff7300"/>
                    <Tooltip/>
                </ComposedChart>
            );
        }

        if (this.state.popOut) {
            return (
                <div className="message-body">
                    <SPCMPopOut
                        title={this.title}
                        close={this.closePopOut}
                        element={element}
                    />
                </div>
            );
        }
        else {
            return (
                <div>
                    <article className="message is-info">
                        <div className="message-header">
                            {this.title}
                            <DeviceConnectToggler
                                title={this.title}
                                deviceName={this.name}
                                isOpened={this.state.isOpened}
                                releaseDevice={this.props.releaseDevice}
                                openDevice={this.props.openDevice}
                            />
                            <div>
                                <button
                                    className={"button is-danger is-rounded"}
                                    onClick={this.openPopOut}
                                    disabled={!this.state.isOpened}
                                >
                            <span className="icon tooltip" data-tooltip={`Pop out`}>
                                <ion-icon name="open"/>
                            </span>
                                </button>
                            </div>
                            <button className={"delete"} onClick={() => {
                                this.props.minimize(this.name)
                            }}/>
                        </div>
                        <div className={"message-body"}>
                            {element}
                        </div>
                    </article>
                </div>
            );
        }
    }
}

export default SPCM;
