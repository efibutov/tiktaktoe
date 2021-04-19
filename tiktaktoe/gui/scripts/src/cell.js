import React from "react";

function Cell(props) {
    const letter = props.letter ? props.letter : "";
    const style = {
        width: 42 + "px",
        height: 42 + "px",
        border: 1 + "px solid black"
    }
    return (
        <td
            style={style}
            onClick={() => {
                console.log(props.coordinates.i + " " + props.coordinates.j)}
            }
        >
            {letter}
        </td>
    )
}

export default Cell;
