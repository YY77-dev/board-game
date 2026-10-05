'use client';

import { useState } from "react";
import { type Player, createEmptyBoard, getCurrentPlayer, getWinner, play } from "@/games/tic-tac-toe/logic";

export default function TicTacToe() {
    const [board, setBoard] = useState(createEmptyBoard);
    
    const currentPlayer: Player = getCurrentPlayer(board);
    const winner: Player | null = getWinner(board);
    
    const handlePlay = (rowIndex: number, colIndex: number) => {
        setBoard(play(board, rowIndex, colIndex));
    };

    return (
        <>
            <h1>三目並べ</h1>
            <p>{winner === null ? `${currentPlayer}の番` : `${winner}の勝ち!`}</p>
            <div className="grid grid-cols-3 w-fit">
                {board.map((row, rowIndex) => {
                    return (
                        row.map((cell, colIndex) => {
                            return (
                                <button key={`${rowIndex}-${colIndex}`} onClick={() => handlePlay(rowIndex, colIndex)} disabled={winner !== null} className="w-25 h-25">
                                    {cell}
                                </button>
                            );
                        })
                    );
                })}
            </div>
        </>
    );
}