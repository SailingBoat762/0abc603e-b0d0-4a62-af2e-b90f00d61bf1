import { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ squares, onPlay, xIsNext }) {
  let winner = calculateWinner(squares);
  function handleClick(i) {
    if (squares[i] || winner) {
      return;
    }
    squares = squares.slice();
    if (xIsNext) {
      squares[i] = "X";
    } else {
      squares[i] = "O";
    }

    onPlay(squares);
  }

  let status;
  if (winner) {
    status = `winner is ${winner}`;
  } else {
    // status和xIsNext同步
    status = "next is " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([new Array(9).fill(null)]);

  let [curMove, setCurMove] = useState(0);

  // 当前状态
  const currentSquares = history[curMove];
  // 取模为0
  const xIsNext = curMove % 2 == 0;

  function handlePlay(square) {
    // 取0-curMove，用于回溯。当curMove回到旧的状态，那么curMove后面的square都丢弃
    const nextHistory = [...history.slice(0, curMove + 1), square];
    setHistory(nextHistory);
    setCurMove(++curMove);
  }

  function jumpTo(i) {
    setCurMove(i);
  }

  // 回溯button
  const moves = history.map((v, i) => {
    return (
      <li>
        <button onClick={() => jumpTo(i)} key={i}>
          {!i ? "Game start" : "jump to" + i}
        </button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

// until
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
