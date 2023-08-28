import React from "react";

import { GameData, getSessions } from "../collections/Session";
import { MainBoard } from "../App";
interface Props {
  handleStartGame: () => void;
}

const formatDate = (rawDate: Date) => {
  const date = new Date(rawDate);

  const year = date.getFullYear();
  const day = date.getDate();
  const month = date.toLocaleString("default", {
    month: "long",
  });

  const time = new Date(rawDate).toLocaleString("en-US", {
    // year: "numeric",
    // month: "numeric",
    // day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  });

  return `${month} ${day}, ${year} at ${time}`;
};

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
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {session.scoreBoard?.map((round, j) => {
                      return (
                        <tr key={j}>
                          <td>Round {j + 1}</td>
                          <td>
                            {round.winner === 1
                              ? `${session.player1} ❌`
                              : `${session.player2} ⭕`}
                          </td>
                          <td>
                            <div style={{zoom: "50%"}}>
                              <MainBoard board={round.board} />
                            </div>
                          </td>
                          <td>{formatDate(session.date!)}</td>
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
  const [data, setData] = React.useState<GameData[]>();

  React.useEffect(() => {
    // Initial render
    (async () => {
      const data = await getSessions();
      setData(data);
    })();
  }, []);

  return (
    <>
      {data?.length && <PreviousSessions data={data} />}

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
