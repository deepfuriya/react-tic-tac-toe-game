const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export default function GameBoard({ onSelectSquareFromApp, turns }) {

    let gameBoard = initialGameBoard;
    for(const turn of turns){
        const { square, player } = turn;
        const { row, col} = square;
        gameBoard[row][col] = player;
    }
    
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
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button onClick={() => onSelectSquareFromApp(rowIndex, colIndex)}>
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
