import React from "react";

function Toggler(props) {
    return (
        <div className={"field is-horizontal tooltip"} data-tooltip={props.toolTip}>
            <div className={"field-label is-normal"}>
                <span
                    className="icon has-text-info is-primary"
                >
                    <ion-icon name={props.iconName}/>
                </span>
            </div>

            <div className={"field-body"}>
                <div className={"field"}>
                    <input
                        type={"checkbox"}
                        className={"switch is-rounded"}
                        id={props.id}
                        name={props.id}
                        checked={props.isChecked}
                        onChange={props.callback}
                    />
                    <label htmlFor={props.id} className={"white-label"}>
                        {props.label}
                    </label>
                </div>
            </div>
        </div>
    )

}

export default Toggler;
