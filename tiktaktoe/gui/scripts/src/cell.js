import React from "react";

function Cell(props) {
    let letter = " ";

    if (props.letter === true) {
        letter = "X";
    }
    else if (props.letter === false){
        letter = "O"
    }

    const style = {
        width: 50 + "px",
        height: 50 + "px",
        border: 2 + "px solid black",
    }
    return (
        <td
            style={style}
            onClick={() => {props.setCellValue(props.coordinates)}}
        >
            <h1>{letter}</h1>
        </td>
    )
}

export default Cell;
