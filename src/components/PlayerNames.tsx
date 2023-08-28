import React from "react";

interface Props {
  back: () => void;
  startGame: (player1: string, player2: string) => void;
}

export default function Grid({ back, startGame }: Props): JSX.Element {
  const [player1, setPlayer1] = React.useState<string>("");
  const [player2, setPlayer2] = React.useState<string>("");

  const [currentPlayer, setCurrentPlayer] = React.useState<number>(1);

  const [isButtonVisible, setIsButtonVisible] = React.useState<boolean>(false);

  return (
    <h1>
      {currentPlayer === 1 && (
        <div>
          <h2>❌</h2>
          <h5>Enter Player 1's name:</h5>
          <form>
            <input
              onChange={(e) => {
                setPlayer1(e.target.value);

                e.target.value && setIsButtonVisible(true);

                !e.target.value && setIsButtonVisible(false);
              }}
              type="text"
              placeholder="Player 1"
              name="player1"
              id="player1"
            />
            <br />
            {/* <input type="submit" value="Submit" /> */}
          </form>
        </div>
      )}

      {currentPlayer === 2 && (
        <div>
          <h2>⭕</h2>
          <h5>Enter Player 2's name:</h5>
          <form>
            <input
              onChange={(e) => {
                setPlayer2(e.target.value);

                e.target.value && setIsButtonVisible(true);

                !e.target.value && setIsButtonVisible(false);
              }}
              type="text"
              placeholder="Player 2"
              name="player2"
              id="player2"
            />
            <br />
            {/* <input type="submit" value="Submit" /> */}
          </form>
        </div>
      )}

      <br />
      <button
        type="button"
        onClick={() => {
          back();
        }}
      >
        Back to Home Page
      </button>

      {isButtonVisible && (
        <button
          type="button"
          onClick={() => {
            player1 &&
              (() => {
                // If player 1 is set
                player1 &&
                  !player2 &&
                  (() => {
                    setCurrentPlayer(2);
                    setIsButtonVisible(false);
                  })();

                // If both players are set
                player1 && player2 && startGame(player1, player2);
              })();
          }}
        >
          {player1 && !player2 && "Next"}
          {player1 && player2 && "Start Game"}
        </button>
      )}
    </h1>
  );
}
