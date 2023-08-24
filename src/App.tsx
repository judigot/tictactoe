import React from "react";

import "./App.css";
import Grid from "./components/Grid";

function App() {
  const [turn, setTurn] = React.useState<boolean>(true);
  return (
    <>
      <h1>Tic-Tac-Toe - judigot</h1>
      <h1>{turn.toString()}</h1>
      <div id="gridContainer">
        <div
          id="gridBox"
          style={{ backgroundColor: "red", position: "relative" }}
          onClick={() => {
            setTurn(!turn);
          }}
        >
          {[...Array(9)].map((element, i) => {
            return <Grid index={i + 1} />;
          })}
        </div>
      </div>
    </>
  );
}

export default App;
