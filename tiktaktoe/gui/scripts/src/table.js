import React from "react";
import Cell from "./cell";

class Table extends React.Component {
    constructor(props) {
        super(props);
        const board = new Array(3);

        for (let i=0; i<3; ++i) {
            board[i] = Array(null, null, null);
        }

        this.state = {
            boardState: board
        }

        this.setCellValue = this.setCellValue.bind(this);
        this.createBoard = this.createBoard.bind(this);
    }

    setCellValue(x, y, value) {
        const boardState = this.state.boardState;
        boardState[x][y] = value;

        this.setState({
            boardState: boardState
        })
    }

    createBoard() {
        const columns = Array();

        for (let i=0; i<3; ++i) {
            const row = Array();

            for (let j=0; j<3; ++j){
                row[j] = (
                    <Cell
                        letter={this.state.boardState[i][j]}
                        key = {`${i}_${j}`}
                    />
                )
            }
            columns[i] = (
                <tr key={i}>
                    {row}
                </tr>
            );
        }
        return columns;
    }

    render() {
        const tableStyle = {
            border: 1 + 'px solid black',
            width: 50 + "%",
        };

        return (
            <div>
                <table style={
                    {tableStyle}
                }>
                    <tbody>
                        {this.createBoard()}
                    </tbody>
                </table>
                <br />
                <form action={"old_games.html"}>
                    <button>Save</button>
                </form>
            </div>

        )
    }
}

export default Table;
