import React from "react";
import Stage from "./devices/stage/stage";
import SPCM from "./devices/spcm";
import GreenLaser from "./devices/lasers/green-laser/green-laser";
import ScanImage from "./scan-image/scan-image";
import ScanParams from "./scan-params/scan-params";
import Warning from "./warning";
import Error from "./error";
import MinimizedPortDashboards from "./minimized-port-dashboards";
import StationDashBoard from "./station-dashboard";
import Helpers from "./helpers";
import getWebSocket from "./web-socket";
import {uuidv4} from "./utils";

class MainGui extends React.Component {
    constructor(props) {
        super(props);
        this.webSocketPort = props.webSocketPort;

        this.state = {
            lastPixel: undefined,
            setupName: undefined,
            stationIP: undefined,
            scanParams: undefined,
            usedPorts: {},
            devicesData: {},
            warning: undefined,
            error: undefined,
            closedLoop: undefined,
            autoSave: undefined,
            fastScan: undefined,
            continuous: undefined,
            pixelTime: undefined,
            isScanning: undefined,
            minimizedElements: ["Debug_info"],
            helpers: ["Debug_info", "ScanImage", "ScanParams"]
        };
        this.onClose = this.onClose.bind(this);
        this.setNewDeviceState = this.setNewDeviceState.bind(this);
        this.onConnect = this.onConnect.bind(this);
        this.onMessage = this.onMessage.bind(this);
        this.callDeviceCommand = this.callDeviceCommand.bind(this);
        this.minimizeElement = this.minimizeElement.bind(this);
        this.maximizeElement = this.maximizeElement.bind(this);
        this.getStationStatus = this.getStationStatus.bind(this);
        this.getDeviceStatus = this.getDeviceStatus.bind(this);
        this.getStationConfig = this.getStationConfig.bind(this);
        this.releaseAllPorts = this.releaseAllPorts.bind(this);
        this.setStationConfig = this.setStationConfig.bind(this);
        this.sendToWebsocket = this.sendToWebsocket.bind(this);
        this.createElements = this.createElements.bind(this);
        this.openDevice = this.openDevice.bind(this);
        this.releaseDevice = this.releaseDevice.bind(this);
        this.setScanParams = this.setScanParams.bind(this);
        this.setScanParams = this.setScanParams.bind(this);
        this.startScanning = this.startScanning.bind(this);
        this.stopScanning = this.stopScanning.bind(this);
        this.saveScanData = this.saveScanData.bind(this);
        this.loadScanData = this.loadScanData.bind(this);
        this.updateImagePixel = this.updateImagePixel.bind(this);
    }

    saveScanData(path, data) {
        console.log("SAVE SCANNED DATA");
        this.sendToWebsocket({
            "request": "save_file",
            "path": path,
            "data": data
        });
    }

    loadScanData(path) {
        this.sendToWebsocket({
            "request": "load_file",
            "path": path,
        });
    }

    startScanning() {
        this.sendToWebsocket({
            request: "start_scanning",
            args: {}
        });
    }

    stopScanning() {
        console.log("STOP SCANNING");
        this.sendToWebsocket({
            request: "stop_scanning",
            priority: 0,
            args: {}
        });
    }

    sendToWebsocket(msg) {
        msg["event_id"] = uuidv4();
        this.webSocket.send(JSON.stringify(msg));
        // console.log(msg);
    }

    getStationConfig() {
        this.sendToWebsocket({
            request: "get_config",
        });
    }

    callDeviceCommand(deviceName, command, kwargs) {
        this.sendToWebsocket({
            request: "call_device_command",
            deviceName: deviceName,
            command: command,
            kwargs: kwargs
        });
    }

    onClose(data) {
        console.log(data);
        //If the server drops the connection, the code will be 1006, and we set error
        const code = data.code;
        if (code === 1006 || code === 1000) {
            this.setState({
                warning: undefined,
                error: {title: "The agent is not available", subtitle: "See list of processes"}
            })
        }
    }

    onConnect() {
        try {
            this.getStationConfig();
            this.getStationStatus();
        }
        catch (e) {
            console.log("Failed to get station config and/or status");
        }
    }

    setScanParams(newParams) {
        this.sendToWebsocket({
            request: "set_scan_params",
            args: newParams
        });
    }

    setNewDeviceState(msg) {
        let devicesData = JSON.parse(JSON.stringify(this.state.devicesData));
        const deviceName = msg.device_name;

        if (devicesData[deviceName]) {
            devicesData[deviceName].state = msg.device_data;
            devicesData[deviceName].isOpened = msg.is_port_open;
            devicesData[deviceName].isBlocked = msg.is_blocked;
        }

        this.setState({
            devicesData: devicesData,
            warning: undefined,
            error: undefined
        });
    }

    setStationConfig(msg) {
        const data = msg.data;

        this.setState({
            setupName: data.Name,
            stationIP: data.IP,
            usedPorts: data.ports,
            devicesData: data.Devices,
            scanParams: data.scan_params,
            isScanning: data.is_scanning
        });
    }

    updateImagePixel(msg) {
        const newPixel = msg.data;

        if (this.state.lastPixel !== newPixel) {
            this.setState({
                lastPixel: newPixel
            });
        }
    }

    onMessage(msg) {
        const command = msg.command;

        switch (command) {
            case "update_device_data":
                this.setNewDeviceState(msg.data);
                break;
            case "update_station_config":
                this.setStationConfig(msg);
                break;
            case "push_debug_message":
                this.setState({
                    debugMessage: msg.params
                });
                break;
            case "push_experiment_phase":
                break;
            case "updateImagePixel":
                this.updateImagePixel(msg);
                break;
            case undefined:
                break;
        }

        if (msg.warning) {
            this.setState({
                warning: {title: msg.warning, subtitle: msg.tip},
                configData: {},
            });
        }

        this.setState({
            error: undefined
        });
    }

    getStationStatus() {
        this.sendToWebsocket({
            request: "get_status",
        });
    }

    getDeviceStatus(deviceName) {
        this.sendToWebsocket({
            request: 'get_device_status',
            device_name: deviceName
        });
    }

    componentDidMount() {
        this.webSocket = getWebSocket(
            window.location.hostname,
            this.webSocketPort,
            this.onMessage,
            this.onConnect,
            this.onClose
        );
    }

    releaseAllPorts() {
        this.sendToWebsocket({
            request: 'release_all_ports'
        });
    }

    releaseDevice(deviceName) {
        this.callDeviceCommand(deviceName, 'close_device', undefined);
        // console.log(`Releasing ${deviceName}`);
    }

    openDevice(deviceName) {
        this.callDeviceCommand(deviceName, 'open_device', undefined);
        // console.log(`Opening ${deviceName}`);
    }

    minimizeElement(deviceName) {
        let minimizedElements = this.state.minimizedElements;
        minimizedElements.push(deviceName);
        this.setState({minimizedElements: minimizedElements});
    }

    maximizeElement(name) {
        this.getStationStatus();
        const minimizedElements = this.state.minimizedElements;
        const index = minimizedElements.indexOf(name);
        //todo: use shift method
        minimizedElements.splice(index, 1);
        this.setState({minimizedElements: minimizedElements});
    }

    createElements() {
        const devicesData = this.state.devicesData;
        let devicesElements = [];
        const sortedKeys = Object.keys(devicesData).sort();

        for (let i in sortedKeys) {
            let deviceName = sortedKeys[i];
            let klass = devicesData[deviceName].klass;
            let deviceConfig = devicesData[deviceName];
            let deviceElement = undefined;

            if (this.state.minimizedElements.indexOf(deviceName) !== -1) {
                continue;
            }

            switch (klass) {
                case "SPCM":
                    deviceElement = (
                        <SPCM
                            title={devicesData[deviceName].title}
                            key={deviceName}
                            callDeviceCommand={this.callDeviceCommand}
                            name={deviceName}
                            params={deviceConfig}
                            minimize={this.minimizeElement}
                            releaseDevice={this.releaseDevice}
                            openDevice={this.openDevice}
                        />
                    );
                    break;
                case "GreenLaser":
                    deviceElement = (
                        <GreenLaser
                            key={deviceName}
                            callDeviceCommand={this.callDeviceCommand}
                            name={deviceName}
                            params={devicesData[deviceName]}
                            minimize={this.minimizeElement}
                            releaseDevice={this.releaseDevice}
                            openDevice={this.openDevice}
                        />
                    );
                    break;
                case "EmulatorStage":
                case "StageE861":
                    deviceElement = (
                        <Stage
                            key={deviceName}
                            callDeviceCommand={this.callDeviceCommand}
                            name={deviceName}
                            params={devicesData[deviceName]}
                            minimize={this.minimizeElement}
                            releaseDevice={this.releaseDevice}
                            openDevice={this.openDevice}
                        />
                    );
                    break;
            }

            devicesElements.push(deviceElement);
        }

        const helpers = this.state.helpers;
        const helpersElements = [];

        for (let i in helpers) {
            let helperName = helpers[i];

            if (this.state.minimizedElements.indexOf(helperName) === -1) {
                switch (helperName) {
                    case "Debug_info":
                    case "ScanImage":
                    case "ScanParams":
                        helpersElements.push(helperName);
                        break;
                }
            }
        }

        return [devicesElements, helpersElements];
    }

    render() {
        if (this.state.warning) {
            return <Warning title={this.state.warning.title} subtitle={this.state.warning.subtitle}/>
        } else if (this.state.error) {
            return <Error title={this.state.error.title} subtitle={this.state.error.subtitle}/>
        }
        else if (!this.state.devicesData) {
            return <div/>
        }
        const elements = this.createElements();
        const devicesElements = elements[0];
        const helpersElements = elements[1];

        return (
            <div>
                <footer className="header">
                    <div className="content has-text-centered">
                        <StationDashBoard
                            allPortsReleased={this.state.configData}
                            releaseAllPorts={this.releaseAllPorts}
                            setupName={this.state.setupName}
                            stationIP={this.state.stationIP}
                            usedPorts={this.state.usedPorts}
                        />
                    </div>
                </footer>

                <div className={"box"}>
                    <div className={"columns"}>
                        {devicesElements}
                    </div>
                </div>

                <Helpers
                    helpersElements={helpersElements}
                    minimizeElement={this.minimizeElement}
                    setScanParams={this.setScanParams}
                    startScanning={this.startScanning}
                    stopScanning={this.stopScanning}
                    saveScanData={this.saveScanData}
                    loadScanData={this.loadScanData}
                    scanParams={this.state.scanParams}
                    isScanning={this.state.isScanning}
                    lastPixel={this.state.lastPixel}
                />

                <MinimizedPortDashboards
                    minimizedElements={this.state.minimizedElements}
                    maximizeElement={this.maximizeElement}
                />
            </div>
        );
    }
}

export default MainGui;
