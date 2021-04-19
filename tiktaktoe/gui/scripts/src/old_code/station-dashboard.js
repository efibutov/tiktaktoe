import React from "react";
import OpenCloseAllPortsSwitch from "./table";
import StationName from "./station-name";

class StationDashBoard extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state={};
    }

    render() {
        return (
            <nav className={"navbar is-fixed-top is-link"} id={"top-bar"}>
            <div
                className={"navbar-item"}
            >
                <StationName
                    setupName={this.props.setupName}
                    stationIP={this.props.stationIP}
                    usedPorts={this.props.usedPorts}
                />
            </div>
            <div className={"navbar-item"}>
                <OpenCloseAllPortsSwitch
                    allPortsStatus={this.props.allPortsStatus}
                    releaseAllPorts={this.props.releaseAllPorts}
                />
            </div>
        </nav>
        );
    }
}

export default StationDashBoard;
