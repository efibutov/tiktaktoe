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
            boardState: board,
            currentLetter: true
        }

        this.setCellValue = this.setCellValue.bind(this);
        this.createBoard = this.createBoard.bind(this);
        this.setSymbol = this.setSymbol.bind(this);
    }

    setSymbol(i, j) {
        console.log(i, j);

        // const boardState = this.state.boardState
    }

    setCellValue(i, j) {
        if (this.state.boardState[i][j] === null) {
            const boardState = this.state.boardState;
            boardState[i][j] = this.state.currentLetter;
            const symbol = !this.state.currentLetter;

            this.setState({
                boardState: boardState,
                currentLetter: symbol
            })
        }
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
                        coordinates={ {"i": i, "j": j} }
                        setCellValue={this.setCellValue}
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
