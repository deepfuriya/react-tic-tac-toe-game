

export default function GameBoard({ onSelectSquareFromApp, board }) {
 

  //   const [gameBoard, setGameBoard] = useState(initialGameBoard);

  //   function handleSelectSqaure(rowIndex, colIndex) {
  //     setGameBoard((prevGameBoard) => {
  //       const tmpGameBoard = [...prevGameBoard];
  //       tmpGameBoard[rowIndex][colIndex] = activePlayerSymbol;
  //       return tmpGameBoard;
  //     });

  //     onSelectSquareFromApp();
  //   }
  return (
    <ol id="game-board">
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button
                  onClick={() => onSelectSquareFromApp(rowIndex, colIndex)}
                  disabled={playerSymbol !== null}
                >
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
