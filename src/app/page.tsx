'use client'

import { useState, useEffect, use } from "react";

import Image from "next/image";
import OImage from "../../public/O.png";
import XImage from "../../public/X.png";

import GameTile from "../components/GameTile";
import TurnDisplay from "../components/TurnDisplay";

export default function Home() {
  const [playerTurn, setPlayerTurn] = useState("X");
  const [winner, setWinner] = useState("none");
  const [tileMarkList, setTileMarkList] = useState([
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
  ]);
  const [xScore, setXScore] = useState(0);
  const [oScore, setOScore] = useState(0);
  const [draws, setDraws] = useState(0);

  const winStats = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]


  
  const tileList: any[] = [];

  
  const checkForWinState = () => {
    for(let i = 0; i < winStats.length; i++){
      if(tileMarkList[winStats[i][0]] == tileMarkList[winStats[i][1]] &&
        tileMarkList[winStats[i][1]] == tileMarkList[winStats[i][2]]){
          return tileMarkList[winStats[i][0]]
      }
    }
    if(tileMarkList.includes("none")){
      return "none"
    } else {
      return "draw"
    }
  }

  const addScore = () => {
    switch (winner) {
      case "draw":
        setDraws(draws + 1)
        break;
      case "X":
        setXScore(xScore + 1)
        break;
      case "O":
        setOScore(oScore + 1)
        break;
    }
    console.log(winner);
  }

  useEffect(addScore, [winner])


  const resetGame = () => {
    setTileMarkList([
      "none",
      "none",
      "none",
      "none",
      "none",
      "none",
      "none",
      "none",
      "none",
    ])
    setWinner("none");
    setPlayerTurn("X");
  };


  const resetAll = () => {
    resetGame()
    setXScore(0);
    setOScore(0);
    setDraws(0);
  };

  for(let i = 0; i < tileMarkList.length; i++){
    tileList.push(<GameTile key={i} tileIndex={i} tileMarkList={tileMarkList} playerTurn={playerTurn} setPlayerTurn={setPlayerTurn} checkForWinState={checkForWinState} winner={winner} setWinner={setWinner} addScore={addScore}/>);
  }

  return (
    <div className="flex items-center justify-center min-h-screen sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center">

        <h1 className="text-6xl pt-3 bg-dark">Tic Tac Toe</h1>

        {winner == "none" ? 
          <TurnDisplay playerTurn={playerTurn}/> :
          winner == "draw" ?
            (
              <div  className="font-[family-name:var(--font-geist-mono)]">
                It is a draw...
              </div>
            ):
            (
              <div  className="font-[family-name:var(--font-geist-mono)]">
                Winner is <Image className="inline pb-1" src={winner == "X" ? XImage : OImage} width="15" height="15" alt="" />!
              </div>
            )

        }

        <div className="grid grid-cols-3 gap-4 p-4 bg-indigo-100 dark:bg-indigo-600 border-10 border-solid border-black dark:border-cyan-400 rounded-full">
          {tileList}
        </div>

        <div className="flex flex-row gap-[32px] row-start-2 items-center">
          <p>
            <Image className="inline pb-1" src={XImage} width="15" height="15" alt="" /> Wins: {xScore}
          </p>
          <p>
            Draws: {draws}
          </p>
          <p>
            <Image className="inline pb-1" src={OImage} width="15" height="15" alt="" /> Wins: {oScore}
          </p>
        </div>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <button
            onClick={resetGame}
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#aaa] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
          >
            New Game
          </button>
          <button
            onClick={resetAll}
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-cyan-100 dark:hover:border-white font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
          >
            Reset All
          </button>
        </div>
      </main>
      {/* <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">

      </footer> */}
    </div>
  );
}
