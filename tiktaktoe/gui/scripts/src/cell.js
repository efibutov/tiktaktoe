import React from "react";

function Cell(props) {
    const style = {
        width: 42 + "px",
        height: 42 + "px",
        border: 1 + "px solid black"
    }
    if (props.letter){
        return(
            <td style={style}>
                {props.letter}
            </td>
        )
    }
    else {
        return <td style={style}/>
    }
}

export default Cell;
