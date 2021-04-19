import React from 'react';

function SaveFileButton(props) {
    const tooltipData = props.disabled ? "No data to save" : "Save scanned image as file";

    return (
        <button
            className={"button is-black tooltip"}
            data-tooltip={tooltipData}
            disabled={props.disabled}
            onClick={props.saveImage}
        >
            <span className={"icon"}>
                <ion-icon name={"save"}/>
            </span>
            <span>{"Save"}</span>
        </button>
    )
}

export default SaveFileButton;
