import React from 'react';
import Header from "./header";
import SaveFileButton from "./save-file-button";
let FileSaver = require('file-saver');
import Plotter from './plotter';
import {graphStyleOptions, plotStyleOptions, colorMapOptions, plotStyles, colorMaps, graphStyles} from "./constants";
import {size, getFileDateAsFileName} from "./utils";
let lodash = require("lodash");



class ScanImage extends React.Component {
    constructor(props) {
        super(props);
        this.name = props.name;
        this.state = {
            scanParams: props.scanParams,
            imageBuffer: undefined,
            plotStyle: plotStyles[0],
            colorMap: colorMaps[0],
            graphStyle: graphStyles[0],
            saveDialogActive: false,
            loadDialogActive: false,
        };
        this.selectPlotStyle = this.selectPlotStyle.bind(this);
        this.selectColorMap = this.selectColorMap.bind(this);
        this.selectGraphStyle = this.selectGraphStyle.bind(this);
        this.saveImage = this.saveImage.bind(this);
        this.loadImage = this.loadImage.bind(this);
    }

    selectPlotStyle(e) {
        this.setState({
            plotStyle: e.target.value
        });
    }

    selectColorMap(e) {
        this.setState({
            colorMap: e.target.value
        });
    }

    selectGraphStyle(e) {
        this.setState({
            graphStyle: e.target.value
        });
    }

    componentWillReceiveProps(nextProps, nextContext) {
        let scanParams = nextProps.scanParams;
        let imageBuffer = this.state.imageBuffer;

        if ((imageBuffer === undefined && scanParams !== undefined)|| !lodash.isEqual(scanParams, this.state.scanParams)) {
            console.log(scanParams);
            imageBuffer = Array.from(Array(scanParams.axes.x.points), _ => Array(scanParams.axes.y.points).fill(0.0));
            this.setState({
                scanParams: scanParams,
                imageBuffer: imageBuffer
            });
        }
        else {
            imageBuffer = JSON.parse(JSON.stringify(imageBuffer));
        }

        const newPixel = nextProps.lastPixel;
        try {
            if (this.state.lastPixel !== newPixel) {
                imageBuffer[newPixel.x][newPixel.y] = newPixel.value;
                this.setState({
                    lastPixel: newPixel,
                });
            }
        }
        catch (e) {
            console.log("FAILED TO ", this.state.scanParams, "\n", size(this.state.imageBuffer), "\n\n");
        }
        this.setState({
            imageBuffer: imageBuffer,
        })
    }

    saveImage() {
        if (this.state.imageBuffer) {
            const blob = new Blob(
                [JSON.stringify({data: this.state.imageBuffer})],
                {type: "text/plain;charset=utf-8"}
            );
            FileSaver.saveAs(blob, getFileDateAsFileName());
        }
    }

    loadImage(e) {
        console.log(e.target.value);
    }

    render() {
        return (
            <div className={"imaging"}>
                <article className="message is-info">
                    <Header
                        title={"Scan image"}
                        minimize={this.props.minimizeElement}
                        name={this.name}
                    />

                    <div className="message-body">
                        <nav className="panel">
                            <a className="panel-block">
                                <div className={"field"}>
                                    <label className={"label"} htmlFor={"plotStyle"}>Plot style</label>
                                    <div className={"control"}>
                                        <div className={"select"}>
                                            <select id={"plotStyle"} name={"plotStyle"} onChange={this.selectPlotStyle}>
                                                {plotStyleOptions}
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className={"field"}>
                                    <label className={"label"} htmlFor={"colorMap"}>Color map</label>
                                    <div className={"control"}>
                                        <div className={"select"}>
                                            <select id={"colorMap"} name={"colorMap"} onChange={this.selectColorMap}>
                                                {colorMapOptions}
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className={"field"}>
                                    <label className={"label"} htmlFor={"graphStyle"}>Graph style</label>
                                    <div className={"control"}>
                                        <div className={"select"}>
                                            <select id={"graphStyle"} name={"graphStyle"}
                                                    onChange={this.selectGraphStyle}>
                                                {graphStyleOptions}
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className={"field is-horizontal"}>
                                    <div className={"field-body"}>
                                        {/*Save button*/}
                                        <div className={"field"}>
                                            <SaveFileButton
                                                disabled={this.state.imageBuffer === undefined}
                                                saveImage={this.saveImage}
                                            />
                                        </div>
                                        {/*Load button*/}
                                        <div className={"field"}>
                                            <button
                                                onClick={this.openLoadDialog}
                                                className={"button is-grey"}
                                            >
                                                <span className="icon">
                                                    <ion-icon name={"arrow-round-up"}/>
                                                </span>
                                                <span>{"Load"}</span>
                                            </button>
                                        </div>
                                    </div>
                                    <div className={"field"}>
                                            <input type="file" name="file" onChange={this.loadImage}/>
                                        </div>
                                </div>
                            </a>
                            <a className="panel-block">
                                <Plotter
                                    buffer={this.state.imageBuffer}
                                    graphStyle={this.state.graphStyle}
                                />
                            </a>
                        </nav>
                    </div>
                </article>
            </div>
        );
    }
}

export default ScanImage;
