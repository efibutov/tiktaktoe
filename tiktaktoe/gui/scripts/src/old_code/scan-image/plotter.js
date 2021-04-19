import React from "react";
import Plot from "react-plotly.js";
import Plotly from "plotly.js";

const layout = {
    scene: {
        aspectmode: 'manual',
        aspectratio: {
            x: 1,
            y: 1,
            z: 0.8
        },
        domain: {
            row: 0,
            column: 0
        }
    },
    margin: {
        l: 65,
        r: 50,
        b: 65,
        t: 90,
    },
    width: 800,
    height: 400,
};

class Plotter extends React.Component {
    constructor(props){
        super(props);
        this.divId = "plotter";

        this.state = {
            graphStyle: props.graphStyle,
            buffer: props.buffer
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.state.buffer = nextProps.buffer;
        this.state.graphStyle = nextProps.graphStyle;
    }

    componentWillUnmount() {
        clearInterval(this.refresh);
    }

    componentDidMount() {
        const div = document.getElementById(this.divId);
        let plotData = {
            type: this.state.graphStyle,
            z: this.state.buffer,
            contours: {
                z: {
                    show: true,
                    usecolormap: true,
                    highlightcolor: "#42f462",
                    project: {z: true}
                }
            }
        };
         Plotly.plot(
             div,
             [plotData]
         );

         this.refresh = setInterval(
             () => {
                 try{
                     plotData.z = JSON.parse(JSON.stringify(this.state.buffer));
                     plotData.type = this.state.graphStyle;
                     Plotly.react(div, [plotData], layout);
                 }
                 catch (e) {
                     console.log(e);
                 }
             },
             10
         )
    }

    render() {
        return (
            <div
                id={this.divId}
                style={{
                    "width": "600px",
                    "height": "400px"
                }}
            />
        )
    }

}

export default Plotter;
