'use client';

import { useState } from "react";
import { Button } from "@mantine/core";
import { type Player, type Line, createEmptyBoard, getCurrentPlayer, getWinningLine, getWinner, play } from "@/games/tic-tac-toe/logic";

export default function TicTacToe() {
    const [board, setBoard] = useState(createEmptyBoard);
    
    const currentPlayer: Player = getCurrentPlayer(board);
    const winner: Player | null = getWinner(board);
    const winningLine: Line | null = getWinningLine(board);
    const cellCenter = 0.5;
    const winningCoordinateRow1 = winningLine?.[0][0] ?? 0;
    const winningCoordinateCol1 = winningLine?.[0][1] ?? 0;
    const winningCoordinateRow2 = winningLine?.[2][0] ?? 0;
    const winningCoordinateCol2 = winningLine?.[2][1] ?? 0;
    
    const handlePlay = (rowIndex: number, colIndex: number) => {
        setBoard(play(board, rowIndex, colIndex));
    };

    const handleReset = () => {
        setBoard(createEmptyBoard());
    };

    return (
        <>
            <h1>三目並べ</h1>
            <p>{winner === null ? `${currentPlayer}の番` : `${winner}の勝ち!`}</p>
            <div className="relative w-fit">
                <div className="grid grid-cols-3">
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
                {winningLine && (
                    <svg viewBox="0 0 3 3" className="absolute inset-0 w-full h-full pointer-events-none">
                        <line x1={winningCoordinateCol1 + cellCenter} y1={winningCoordinateRow1 + cellCenter} x2={winningCoordinateCol2 + cellCenter} y2={winningCoordinateRow2 + cellCenter} stroke="red" strokeWidth={0.1} strokeLinecap="round" />
                    </svg>
                )}
            </div>
            <Button onClick={handleReset}>リセット</Button>
        </>
    );
}