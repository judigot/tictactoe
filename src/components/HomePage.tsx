interface Props {
  handleStartGame: () => void;
}

interface GameData {
  player1: string;
  player2: string;
  gameRounds: [
    {
      winner: number;
      board: Array<(boolean | string)[]>;
    }
  ];
}

export default function HomePage({ handleStartGame }: Props): JSX.Element {
  const data: GameData[] = [
    {
      player1: "Jude",
      player2: "Francis",
      gameRounds: [
        {
          winner: 1,
          board: [
            [false, false, false],
            [false, false, false],
            [false, false, false],
          ],
        },
      ],
    },
  ];
  return (
    <>
      <div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            height: "200px",
          }}
        >
          <div style={{ border: "1px solid white" }}>
            <h2>{data[0].player1} ❌</h2>
            <span>vs</span>
            <h2>{data[0].player2} ⭕</h2>
          </div>
          <div style={{ border: "1px solid white" }}>
            <table style={{ display: "inline-block" }}>
              <thead>
                <tr>
                  <th>Round</th>
                  <th>Winner</th>
                  <th>Board</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Round 1</td>
                  <td>
                    {data[0].gameRounds[0].winner === 1
                      ? data[0].player1
                      : data[0].player2}
                  </td>
                  <td>View Game</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <h1>
        <button
          type="button"
          onClick={() => {
            handleStartGame();
          }}
        >
          Start New Game
        </button>
      </h1>
    </>
  );
}
