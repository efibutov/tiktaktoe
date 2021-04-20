import React from "react";
import Cell from "./cell";

class Table extends React.Component {
    constructor(props) {
        super(props);
        const board = Array();

        for (let i=0; i<3; ++i) {
            board[i] = Array(null, null, null);
        }

        this.state = {
            boardState: board,
            currentLetter: true
        }

        this.setCellValue = this.setCellValue.bind(this);
        this.createBoard = this.createBoard.bind(this);
        this.updateBoard = this.updateBoard.bind(this);
    }

    updateBoard(data) {
        console.log(JSON.stringify(data));
    }

    makeMove(i, j) {
        const endPoint = "/ttt/make_move/";
        const request = {
            method: "POST",
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.cookie.csrftoken
            },
            body: JSON.stringify(this.state.boardState)
        };

        fetch(endPoint, request)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                this.updateBoard(data);
            });
    }

    setCellValue(coordinates) {
        const i = coordinates.i;
        const j = coordinates.j;
        this.makeMove(i, j);
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
