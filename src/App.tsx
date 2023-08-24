import React from "react";

import "./App.css";
import Grid from "./components/Grid";

function App() {
  const WINNERS = [
    [1, 1, 1],
    [false, false, false],
    [false, false, false],
  ];

  const CLEANBOARD = [
    [false, false, false],
    [false, false, false],
    [false, false, false],
  ];
  const [board, setBoard] =
    React.useState<Array<(boolean | number)[]>>(CLEANBOARD);

  const [remainingMoves, setRemainingMoves] = React.useState<number>(9);

  const handleReset = () => {
    setBoard(CLEANBOARD);
    setRemainingMoves(9);
  };

  const handleMarkGrid = (gridIndex: number) => {
    const tempBoard = board;
    const mark = remainingMoves % 2 !== 0 ? 1 : 0;
    setRemainingMoves(remainingMoves - 1);

    // 1st row if index is 0, 1, 2
    if (gridIndex >= 0 && gridIndex <= 2) {
      tempBoard[0][gridIndex] = mark;
    }

    // 2nd row if index is 3, 4, 5
    if (gridIndex >= 3 && gridIndex <= 5) {
      tempBoard[1][gridIndex - 3] = mark;
    }

    // 3rd row if index is 6, 7, 8
    if (gridIndex >= 6 && gridIndex <= 8) {
      tempBoard[2][gridIndex - 6] = mark;
    }
  };

  return (
    <>
      <h1>Tic-Tac-Toe - judigot</h1>
      <h1>
        {remainingMoves === 0 &&
          (() => {
            return `Draw`;
          })()}
        {remainingMoves !== 0 &&
          (() => {
            return `${remainingMoves % 2 !== 0 ? "❌" : "⭕"}'s turn`;
          })()}
      </h1>
      <div>Remaining moves: {remainingMoves}</div>
      <div id="gridContainer">
        <div id="gridBox">
          {[...Array(9)].map((element, i) => {
            let gridState: boolean | number = false;

            // 1st row if index is 0, 1, 2
            if (i >= 0 && i <= 2 && typeof board[0][i] !== "boolean") {
              gridState = board[0][i];
            }

            // 2nd row if index is 3, 4, 5
            if (i >= 3 && i <= 5 && typeof board[1][i - 3] !== "boolean") {
              gridState = board[1][i - 3];
            }

            // 3rd row if index is 6, 7, 8
            if (i >= 6 && i <= 8 && typeof board[2][i - 6] !== "boolean") {
              gridState = board[2][i - 6];
            }

            return (
              <Grid
                gridIndex={i}
                gridState={gridState}
                handleMarkGrid={handleMarkGrid}
              />
            );
          })}
        </div>
      </div>
      <br />
      <br />
      <br />
      <div>{board.toString()}</div>
      {remainingMoves !== 9 && (
        <button type="button" onClick={handleReset}>
          {(() => {
            return remainingMoves !== 0 ? "Reset" : "New Game";
          })()}
        </button>
      )}
    </>
  );
}

export default App;
