'use client';

import { useState } from "react";
import { Button } from "@mantine/core";
import { type Player, type Line, createEmptyBoard, getCurrentPlayer, getWinningLine, getWinner, isDraw, play } from "@/games/tic-tac-toe/logic";

const CELL_CENTER: number = 0.5;

export default function TicTacToe() {
    const [board, setBoard] = useState(createEmptyBoard);
    
    const currentPlayer: Player = getCurrentPlayer(board);
    const winner: Player | null = getWinner(board);
    const draw: boolean = isDraw(board);
    const isGameOver: boolean = winner !== null || draw;
    
    let statusMessage: string;
    if (winner !== null) {
        statusMessage = `${winner}の勝ち！`;
    } else if (draw) {
        statusMessage = '引き分け！';
    } else {
        statusMessage = `${currentPlayer}の番`;
    }

    const winningLine: Line | null = getWinningLine(board);
    const winningCoordinateRow1: number = winningLine?.[0][0] ?? 0;
    const winningCoordinateCol1: number = winningLine?.[0][1] ?? 0;
    const winningCoordinateRow2: number = winningLine?.[2][0] ?? 0;
    const winningCoordinateCol2: number = winningLine?.[2][1] ?? 0;
    
    const handlePlay = (rowIndex: number, colIndex: number) => {
        setBoard(play(board, rowIndex, colIndex));
    };

    const handleReset = () => {
        setBoard(createEmptyBoard());
    };

    return (
        <>
            <h1>三目並べ</h1>
            <p>{statusMessage}</p>
            <div className="relative w-fit">
                <div className="grid grid-cols-3">
                    {board.map((row, rowIndex) => {
                        return (
                            row.map((cell, colIndex) => {
                                return (
                                    <button key={`${rowIndex}-${colIndex}`} onClick={() => handlePlay(rowIndex, colIndex)} disabled={isGameOver} className="w-25 h-25">
                                        {cell}
                                    </button>
                                );
                            })
                        );
                    })}
                </div>
                {winningLine && (
                    <svg viewBox="0 0 3 3" className="absolute inset-0 w-full h-full pointer-events-none">
                        <line x1={winningCoordinateCol1 + CELL_CENTER} y1={winningCoordinateRow1 + CELL_CENTER} x2={winningCoordinateCol2 + CELL_CENTER} y2={winningCoordinateRow2 + CELL_CENTER} stroke="red" strokeWidth={0.1} strokeLinecap="round" />
                    </svg>
                )}
            </div>
            <Button onClick={handleReset}>リセット</Button>
        </>
    );
}