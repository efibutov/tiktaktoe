import React from 'react';

function MinimizedPortDashboards(props) {
    const defaultStyle = "button is-rounded is-dark";
    const devices = Array();
    const minimizedElements = props.minimizedElements;

    for (let i in minimizedElements) {
        let name = minimizedElements[i];
        devices.push(
            <button
                key={name}
                className={defaultStyle}
                onClick={()=>props.maximizeElement(name)}
            >
                <span className={"icon"}>
                    <ion-icon name="open"/>
                </span>
                <strong>{name}</strong>
            </button>
        );
    }

    return (
        <nav className={"navbar is-fixed-bottom is-black"} id={"bottom-bar"}>
            <div className={"field is-grouped"}>
                {devices}
            </div>
        </nav>
    )
}

export default MinimizedPortDashboards;
