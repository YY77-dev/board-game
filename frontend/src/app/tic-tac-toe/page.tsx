'use client';

import { useState } from "react";
import { createEmptyBoard } from "@/games/tic-tac-toe/logic";

export default function TicTacToe() {
    const [board, setBoard] = useState(createEmptyBoard);
    return (
        <>
            <h1>Tic-Tac-Toe</h1>
            <p>Welcome to the Tic-Tac-Toe game!</p>
            <div className="grid grid-cols-3 w-fit">
                {board.map((row, rowIndex) => {
                    return (
                        row.map((cell, colIndex) => {
                            return (
                                <button key={`${rowIndex}-${colIndex}`} className="w-25 h-25">
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