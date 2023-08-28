import React from "react";

import "./App.css";
import Grid from "./components/Grid";
import HomePage from "./components/HomePage";
import PlayerNames from "./components/PlayerNames";

enum GameState {
  HOMEPAGE = "homepage",
  PLAYERNAMES = "playernames",
  GAME = "game",
}

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

  const [player1, setPlayer1] = React.useState<string>("");
  const [player2, setPlayer2] = React.useState<string>("");

  const [remainingMoves, setRemainingMoves] = React.useState<number>(9);

  const [scoreBoard, setScoreBoard] = React.useState<
    {
      winner: number;
      board: Array<(boolean | string)[]>;
    }[]
  >([]);

  const [message, setMessage] = React.useState<string>("");

  const [gameState, setGameState] = React.useState<GameState>(
    GameState.HOMEPAGE
  );

  const [isWinnerSelected, setIsWinnerSelected] =
    React.useState<boolean>(false);

  const reset = () => {
    setMessage("");
    setIsWinnerSelected(false);
    setBoard(CLEAN_BOARD);
    setRemainingMoves(9);
  };

  const handleStop = () => {
    const session = {
      player1,
      player2,
      scoreBoard,
    };
    reset();
    setScoreBoard([]);
    // Insert session; insert data
    // fetch; axios
    alert(JSON.stringify(session));
    setGameState(GameState.HOMEPAGE);
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
      setIsWinnerSelected(true)
      //
      return true;
    }
  };

  const handleMarkGrid = (gridIndex: number) => {
    if (!isWinnerSelected) {
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
        setMessage(`${player1} wins!`);
        setScoreBoard((scoreBoard) => [
          ...scoreBoard,
          {
            winner: 1,
            board,
          },
        ]);
      }
      if (checkForWinners("O")) {
        setMessage(`${player2} wins!`);
        setScoreBoard((scoreBoard) => [
          ...scoreBoard,
          {
            winner: 2,
            board,
          },
        ]);
      }
    }
  };

  const inputPlayerNames = () => {
    setGameState(GameState.PLAYERNAMES);
  };

  const startGame = (player1: string, player2: string) => {
    reset();
    setPlayer1(player1);
    setPlayer2(player2);
    setGameState(GameState.GAME);
  };

  const isDraw = !isWinnerSelected && remainingMoves === 0;

  const currentTurn = remainingMoves % 2 !== 0 ? "❌" : "⭕";

  return (
    <>
      <h1>Tic-Tac-Toe - judigot</h1>
      <p>{JSON.stringify(scoreBoard)}</p>
      {gameState === GameState.HOMEPAGE && (
        <HomePage handleStartGame={inputPlayerNames} />
      )}
      {gameState === GameState.PLAYERNAMES && (
        <PlayerNames
          back={() => {
            setGameState(GameState.HOMEPAGE);
          }}
          startGame={startGame}
        />
      )}
      {gameState === GameState.GAME && (
        <>
          <div>
            <h2 style={{ display: "inline-block" }}>{player1}</h2>
            &nbsp;&nbsp;VS&nbsp;&nbsp;&nbsp;
            <h2 style={{ display: "inline-block" }}>{player2}</h2>
          </div>
          <h3>
            {message}
            {isDraw && "Draw"}
            {!isWinnerSelected &&
              remainingMoves !== 0 &&
              `${
                remainingMoves % 2 !== 0 ? `${player1}'s` : `${player2}'s`
              } turn`}
          </h3>
          <div>Remaining moves: {remainingMoves}</div>
          <div
            id="gridContainer"
            className={`${
              !isWinnerSelected
                ? currentTurn === "❌"
                  ? "X-cursor"
                  : "O-cursor"
                : ""
            }`}
          >
            <div id="gridBox">
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
          {isDraw && <Menu reset={reset} stop={handleStop} />}
          {isWinnerSelected && <Menu reset={reset} stop={handleStop} />}
        </>
      )}
    </>
  );
}

function Menu({
  reset,
  stop,
}: {
  reset: () => void;
  stop: () => void;
}): JSX.Element {
  return (
    <div>
      <button type="button" onClick={reset}>
        Continue
      </button>
      <button type="button" onClick={stop}>
        Stop
      </button>
    </div>
  );
}

export default App;
