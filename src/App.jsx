import { useState } from "react";

import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";


function returnActivePlayer(gameTurns){
  let currentPlayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].player == "X") {
    currentPlayer = "O";
  }
  return currentPlayer; 
}

function App() {
  const [gameTurn, setGameTurn] = useState([]);

  let activePlayer = returnActivePlayer(gameTurn);

  function handleGameTurn(row, col) {

    setGameTurn((previousGameTurn) => {
      let currentPlayer = returnActivePlayer(previousGameTurn);

      let tmpGameturn = [
        { square: { row: row, col: col }, player: currentPlayer },
        ...previousGameTurn,
      ];

      return tmpGameturn;
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name="Player 1" symbol="X" isActive={activePlayer === "X"} />
          <Player name="Player 2" symbol="O" isActive={activePlayer === "O"} />
        </ol>
        <GameBoard turns={gameTurn} onSelectSquareFromApp={handleGameTurn} />
      </div>
      <Log turns={gameTurn} />
    </main>
  );
}

export default App;
