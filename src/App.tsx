import React, { useEffect, useState } from "react";
import BoardComponent from "./components/BoardComponent";
import "./App.css";
import { Board } from "./models/Board";
import { Player } from "./models/Player";
import { Colors } from "./models/Colors";
import "./main.css";
const App = () => {
  const [board, setBoard] = useState(new Board());
  const [whitePlayer, setwhitePlayer] = useState(new Player(Colors.WHITE));
  const [blackPlayer, setblackPlayer] = useState(new Player(Colors.BLACK));
  const [currentPlayer, setcurrentPlayer] = useState<Player | null>(null);
  useEffect(() => {
    restart();
    setcurrentPlayer(whitePlayer);
  }, []);

  function restart() {
    const newBoard = new Board();
    newBoard.initCells();
    newBoard.addFigures();
    setBoard(newBoard);
  }
  function swapPlayer() {
    setcurrentPlayer(
      currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer
    );
  }
  return (
    <div className="app">
      <BoardComponent
        board={board}
        setBoard={setBoard}
        currentPlayer={currentPlayer}
        swapPlayer={swapPlayer}
      />
    </div>
  );
};

export default App;
