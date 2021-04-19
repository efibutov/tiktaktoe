import React from "react";

function Header(props) {
    return (
        <div className="message-header">
            {props.title}
            <button className={"delete"} onClick={() => {props.minimize(props.name)}}/>
        </div>
    );
}

export default Header;
