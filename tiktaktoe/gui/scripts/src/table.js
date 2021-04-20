import React from "react";
import Cell from "./cell";

class Table extends React.Component {
    constructor(props) {
        super(props);

        const board = new Array(3);
        for (let i=0; i<3; ++i) {
            board[i] = new Array(3);
        }

        this.state = {
            boardState: board,
            currentLetter: false
        }

        this.createBoard = this.createBoard.bind(this);
        this.updateBoard = this.updateBoard.bind(this);
        this.makeMove = this.makeMove.bind(this);
    }

    updateBoard(data) {
        this.setState({
            boardState: data.board
        });
    }

    makeMove(coordinates) {
        const currentLetter = !this.state.currentLetter;
        const endPoint = "/ttt/make_move/";
        const request = {
            method: "POST",
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.cookie.csrftoken
            },
            body: JSON.stringify({
                board: this.state.boardState,
                clickOn: coordinates,
                currentLetter: currentLetter
            })
        };

        fetch(endPoint, request)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                this.updateBoard(data);
            });

        this.setState({
            currentLetter: currentLetter
        });
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
                        makeMove={this.makeMove}
                    />
                )
            }
            columns[i] = (
                <tr key={i}>{row}</tr>
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
                <table style={{tableStyle}}>
                    <tbody>
                        {this.createBoard()}
                    </tbody>
                </table>
                <br />

                <form action={"/ttt/save_game/"} method={"POST"}>
                    <button>{"Save"}</button>
                    <a href={"/ttt/old_games"}>Cancel</a>
                </form>
            </div>
        )
    }
}

export default Table;
