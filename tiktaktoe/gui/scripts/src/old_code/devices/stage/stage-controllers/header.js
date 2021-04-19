import React from "react";
import DeviceConnectToggler from "../../device-connect-toggler";

function Header(props) {
    return (
        <article className="message is-grey">
            <div className="message-header">
                {props.title}
                <DeviceConnectToggler
                    title={props.title}
                    deviceName={props.name}
                    isOpened={props.isOpened}
                    releaseDevice={props.releaseDevice}
                    openDevice={props.openDevice}
                />
                <button className={"delete"} onClick={() => {props.minimize(props.name)}}/>
            </div>
        </article>
    );
}

export default Header;
