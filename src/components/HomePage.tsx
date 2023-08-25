interface Props {
  handleStartGame: () => void;
}

interface GameData {
  player1: string;
  player2: string;
  gameRounds: {
    winner: number;
    board: Array<(boolean | string)[]>;
  }[];
}

function PreviousSessions({ data }: { data: GameData[] }): JSX.Element {
  return (
    <>
      <h2>Game Sessions</h2>
      <div style={{ height: "200px", overflowY: "scroll" }}>
        {data?.map((session, i) => {
          return (
            <div
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
              }}
            >
              <div style={{ border: "1px solid white" }}>
                <h2>{session.player1} ❌</h2>
                <span>vs</span>
                <h2>{session.player2} ⭕</h2>
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
                    {session.gameRounds?.map((round, j) => {
                      return (
                        <tr key={j}>
                          <td>Round {j + 1}</td>
                          <td>
                            {round.winner === 1
                              ? `${session.player1} ❌`
                              : `${session.player2} ⭕`}
                          </td>
                          <td>
                            <button type="button">View Game</button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
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
    {
      player1: "Judezzzzzzz",
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
      <PreviousSessions data={data} />
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
