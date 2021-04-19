import React from "react";

function StationName(props){
    const divClassName = "";
    return(
        <div className={divClassName}>
            <div className="tile is-ancestor">
                <div className="tile is-parent">
                    <article className="tile is-child notification is-info">
                        <div className="content">
                            <div className="field is-grouped">
                                <div>
                                    <span className="icon is-large">
                                        {/*<ion-icon name="desktop" style={{"font-size": "40px"}}/>*/}
                                        <ion-icon name="desktop"/>
                                    </span>
                                </div>
                                <div/>
                                <div className={"field tooltip is-tooltip-bottom"}
                                     data-tooltip={`${props.stationIP}\n${JSON.stringify(props.usedPorts)}`}
                                >
                                    <p className={"title"}>
                                        {props.setupName}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        </div>
    );
}

export default StationName;
