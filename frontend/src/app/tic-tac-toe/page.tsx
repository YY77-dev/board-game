'use client';

import { useState } from "react";
import { Button } from "@mantine/core";
import { type Player, type Line, createEmptyBoard, getCurrentPlayer, getWinningLine, getWinner, isDraw, play } from "@/games/tic-tac-toe/logic";

const CELL_CENTER: number = 0.5;
const LINE_EXTENSION = 0.4;

export default function TicTacToe() {
    const [board, setBoard] = useState(createEmptyBoard);
    
    const currentPlayer: Player = getCurrentPlayer(board);
    const winner: Player | null = getWinner(board);
    const isTieGame: boolean = isDraw(board);
    const isGameOver: boolean = winner !== null || isTieGame;

    let statusMessage: string;
    if (winner !== null) {
        statusMessage = `${winner}の勝ち！`;
    } else if (isTieGame) {
        statusMessage = '引き分け！';
    } else {
        statusMessage = `${currentPlayer}の番`;
    }

    const winningLine: Line | null = getWinningLine(board);
    const winningLineStartRow: number = winningLine?.[0][0] ?? 0;
    const winningLineStartCol: number = winningLine?.[0][1] ?? 0;
    const winningLineEndRow: number = winningLine?.[2][0] ?? 0;
    const winningLineEndCol: number = winningLine?.[2][1] ?? 0;

    const directionRow: number = Math.sign(winningLineEndRow - winningLineStartRow);
    const directionCol: number = Math.sign(winningLineEndCol - winningLineStartCol);

    const startRow: number = winningLineStartRow + CELL_CENTER - LINE_EXTENSION * directionRow;
    const startCol: number = winningLineStartCol + CELL_CENTER - LINE_EXTENSION * directionCol;
    const endRow: number = winningLineEndRow + CELL_CENTER + LINE_EXTENSION * directionRow;
    const endCol: number = winningLineEndCol + CELL_CENTER + LINE_EXTENSION * directionCol;
    
    const handlePlay = (rowIndex: number, colIndex: number) => {
        setBoard(play(board, rowIndex, colIndex));
    };

    const handleReset = () => {
        setBoard(createEmptyBoard());
    };

    return (
        <div className="flex flex-col items-center">
            <h1>○×ゲーム</h1>
            <p>{statusMessage}</p>
            <div className="relative w-fit">
                <div className="grid grid-cols-3">
                    {board.map((row, rowIndex) => {
                        return (
                            row.map((cell, colIndex) => {
                                return (
                                    <button
                                    key={`${rowIndex}-${colIndex}`}
                                    onClick={() => handlePlay(rowIndex, colIndex)}
                                    disabled={isGameOver}
                                    className="w-25 h-25">
                                        {cell}
                                    </button>
                                );
                            })
                        );
                    })}
                </div>
                {winningLine && (
                    <svg viewBox="0 0 3 3" className="absolute inset-0 w-full h-full pointer-events-none">
                        <line x1={startCol} y1={startRow} x2={endCol} y2={endRow} stroke="red" strokeWidth={0.1} strokeLinecap="round" />
                    </svg>
                )}
            </div>
            <Button onClick={handleReset}>リセット</Button>
        </div>
    );
}