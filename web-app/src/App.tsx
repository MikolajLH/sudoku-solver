import { useState } from "react";
import { SudokuT, SudokuBoard } from "./SudokuBoard";


const S = 9;

function App() {
  const [sudoku, setSudoku] = useState<SudokuT>({
    board: Array.from({ length: S }, () => Array.from({ length: S }, () => 0))
  });

  const updateCell = (i: number, j: number, val: number) => {
    setSudoku(prevState => {
      const updatedBoard = [...prevState.board];
      updatedBoard[i][j] = val;
      return { ...prevState, board: updatedBoard };
    });
  };

  const handleSolve = () => {
    fetch("http://127.0.0.1:8000/solve", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(sudoku)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json()
      })
      .then(data => {
        console.log('POST request successful:', data);
        setSudoku(data)
      })
      .catch(error => {
        console.error('There was a problem with the POST request:', error);
      });
  };


  return (
    <div className="container">
      <SudokuBoard sudoku={sudoku} update_cell={updateCell} />
      <button onClick={handleSolve}>Solve</button>
    </div>
  )
}

export default App
