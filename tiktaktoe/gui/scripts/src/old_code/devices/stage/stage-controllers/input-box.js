import React from "react";

function InputBox(props) {
    const value = props.value;

    if (value === undefined) {
        return (<div/>);
    }

    function handleInput(e) {
        const v = e.target.value;

    }

    return (
        <div className="field">
            <p className="control has-icons-left has-icons-right">
                <input
                    className="input"
                    type="text"
                    value={value}
                    disabled={!props.enabled}
                    onChange={props.setValue}
                />
            </p>
        </div>
    );
}

export default InputBox;
