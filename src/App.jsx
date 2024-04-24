import { useState } from "react";

import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./components/GameOver";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function returnActivePlayer(gameTurns) {
  let currentPlayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].player == "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

function App() {
  const [players, setPlayers] = useState({
    X: "Player 1",
    O: "Player 2",
  });

  const [gameTurn, setGameTurn] = useState([]);

  let activePlayer = returnActivePlayer(gameTurn);

  let gameBoard = [...initialGameBoard.map((array) => [...array])];

  for (const turn of gameTurn) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }

  let winner;

  for (const tmp of WINNING_COMBINATIONS) {
    const firstTmp = gameBoard[tmp[0].row][tmp[0].column];
    const secondTmp = gameBoard[tmp[1].row][tmp[1].column];
    const thirdTmp = gameBoard[tmp[2].row][tmp[2].column];

    if (firstTmp && firstTmp === secondTmp && secondTmp === thirdTmp) {
      winner = players[firstTmp];
    }
  }

  const gameDraw = gameTurn.length === 9 && !winner;

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

  function handleRestart() {
    setGameTurn([]);
  }

  function handlePlayerNameChange(symbol, newName){
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]: newName
      }
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name="Player 1" symbol="X" isActive={activePlayer === "X"} onChangeName={handlePlayerNameChange} />
          <Player name="Player 2" symbol="O" isActive={activePlayer === "O"} onChangeName={handlePlayerNameChange} />
        </ol>

        <GameBoard board={gameBoard} onSelectSquareFromApp={handleGameTurn} />
        {(winner || gameDraw) && (
          <GameOver winner={winner} onRestart={handleRestart} />
        )}
      </div>
      <Log turns={gameTurn} />
    </main>
  );
}

export default App;
