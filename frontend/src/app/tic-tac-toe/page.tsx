'use client';

import { useState } from "react";
import { type Player, createEmptyBoard, getCurrentPlayer, play } from "@/games/tic-tac-toe/logic";

export default function TicTacToe() {
    const [board, setBoard] = useState(createEmptyBoard);
    
    const currentPlayer: Player = getCurrentPlayer(board);
    
    const handlePlay = (rowIndex: number, colIndex: number) => {
        setBoard(play(board, rowIndex, colIndex));
    };

    return (
        <>
            <h1>三目並べ</h1>
            <p>現在の番手 : {currentPlayer}</p>
            <div className="grid grid-cols-3 w-fit">
                {board.map((row, rowIndex) => {
                    return (
                        row.map((cell, colIndex) => {
                            return (
                                <button key={`${rowIndex}-${colIndex}`} onClick={() => handlePlay(rowIndex, colIndex)} className="w-25 h-25">
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