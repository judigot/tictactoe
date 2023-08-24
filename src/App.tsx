import React from "react";

import "./App.css";
import Grid from "./components/Grid";

function App() {
  const PLAYER_ONE: boolean | string = "X";
  const PLAYER_TWO: boolean | string = "O";

  const CLEAN_BOARD = [
    [false, false, false],
    [false, false, false],
    [false, false, false],
  ];

  const [board, setBoard] =
    React.useState<Array<(boolean | string)[]>>(CLEAN_BOARD);

  const [remainingMoves, setRemainingMoves] = React.useState<number>(9);

  const [message, setMessage] = React.useState<string>("");

  const [isGameOver, setIsGameOver] = React.useState<boolean>(false);

  const handleReset = () => {
    setMessage("");
    setIsGameOver(false);
    setBoard(CLEAN_BOARD);
    setRemainingMoves(9);
  };

  const checkForWinners = (player: string) => {
    // prettier-ignore
    if (
      (board[0][0]=== player && board[0][1]=== player && board[0][2] === player) || // _
      (board[1][0]=== player && board[1][1]=== player && board[1][2] === player) || // _
      (board[2][0]=== player && board[2][1]=== player && board[2][2] === player) || // _
      (board[0][0]=== player && board[1][0]=== player && board[2][0] === player) || // |
      (board[0][1]=== player && board[1][1]=== player && board[2][1] === player) || // |
      (board[0][2]=== player && board[1][2]=== player && board[2][2] === player) || // |
      (board[0][0]=== player && board[1][1]=== player && board[2][2] === player) || // \
      (board[0][2]=== player && board[1][1]=== player && board[2][0] === player) // /
    ) {
      setIsGameOver(true)
      return true;
    }
  };

  const handleMarkGrid = (gridIndex: number) => {
    if (!isGameOver) {
      const mark = remainingMoves % 2 !== 0 ? PLAYER_ONE : PLAYER_TWO;
      setRemainingMoves(remainingMoves - 1);

      // 1st row if index is 0, 1, 2
      if (gridIndex >= 0 && gridIndex <= 2) {
        board[0][gridIndex] = mark;
      }

      // 2nd row if index is 3, 4, 5
      if (gridIndex >= 3 && gridIndex <= 5) {
        board[1][gridIndex - 3] = mark;
      }

      // 3rd row if index is 6, 7, 8
      if (gridIndex >= 6 && gridIndex <= 8) {
        board[2][gridIndex - 6] = mark;
      }

      if (checkForWinners("X")) {
        setMessage("Player 1 wins");
      } else {
        if (remainingMoves === 0) {
          setMessage("Draw");
        }
      }
      if (checkForWinners("O")) {
        setMessage("Player 2 wins");
      } else {
        if (remainingMoves === 0) {
          setMessage("Draw");
        }
      }
    }
  };

  return (
    <>
      <h1>Tic-Tac-Toe - judigot</h1>
      <h1>
        {message}
        {!isGameOver && remainingMoves === 0 && "Draw"}
        {!isGameOver &&
          remainingMoves !== 0 &&
          `${remainingMoves % 2 !== 0 ? "❌" : "⭕"}'s turn`}
      </h1>
      <div>Remaining moves: {remainingMoves}</div>
      <div id="gridContainer">
        <div id="gridBox" className={`${!isGameOver ? "pointer" : ""}`}>
          {[...Array(9)].map((element, i) => {
            let gridState: boolean | string = false;

            // 1st row if index is 0, 1, 2
            if (i >= 0 && i <= 2 && typeof board[0][i] !== "boolean") {
              gridState = board[0][i] === "X" ? "❌" : "⭕";
            }

            // 2nd row if index is 3, 4, 5
            if (i >= 3 && i <= 5 && typeof board[1][i - 3] !== "boolean") {
              gridState = board[1][i - 3] === "X" ? "❌" : "⭕";
            }

            // 3rd row if index is 6, 7, 8
            if (i >= 6 && i <= 8 && typeof board[2][i - 6] !== "boolean") {
              gridState = board[2][i - 6] === "X" ? "❌" : "⭕";
            }

            return (
              <Grid
                key={i}
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
