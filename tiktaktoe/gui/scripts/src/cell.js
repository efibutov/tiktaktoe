import React from "react";

function Cell(props) {
    let letter = "";

    if (props.letter === true) {
        letter = "X";
    }
    else if (props.letter === false){
        letter = "O"
    }
    const style = {
        width: 42 + "px",
        height: 42 + "px",
        border: 1 + "px solid black"
    }
    const coordinates = props.coordinates;
    return (
        <td
            style={style}
            onClick={() => {props.setCellValue(coordinates.i, coordinates.j)}}
        >
            <h1>{letter}</h1>
        </td>
    )
}

export default Cell;
