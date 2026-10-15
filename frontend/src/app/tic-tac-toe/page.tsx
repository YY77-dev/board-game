'use client';

import { useState } from 'react';
import { Button } from '@mantine/core';
import { type TablerIcon, IconCircle, IconX } from '@tabler/icons-react';

import {
    type Player,
    type Line,
    createEmptyBoard,
    getCurrentPlayer,
    getWinningLine,
    getWinner,
    isDraw,
    play,
} from '@/games/tic-tac-toe/logic';

const MARK_ICONS: Record<Player, TablerIcon> = {
    O: IconCircle,
    X: IconX,
};

const CELL_CENTER: number = 0.5;
const LINE_EXTENSION: number = 0.4;

export default function TicTacToe() {
    const [board, setBoard] = useState(createEmptyBoard);

    const currentPlayer: Player = getCurrentPlayer(board);
    const winner: Player | null = getWinner(board);
    const isTieGame: boolean = isDraw(board);
    const isGameOver: boolean = winner !== null || isTieGame;

    let statusMark: Player | null;
    let statusText: string;
    if (winner !== null) {
        statusMark = winner;
        statusText = 'の勝ち！';
    } else if (isTieGame) {
        statusMark = null;
        statusText = '引き分け！';
    } else {
        statusMark = currentPlayer;
        statusText = 'の番';
    }
    const StatusIcon: TablerIcon | null = statusMark === null ? null : MARK_ICONS[statusMark];

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
            <h1>Tic Tac Toe</h1>
            <p className="flex items-center">
                {StatusIcon && <StatusIcon size={18} />}
                {statusText}
            </p>
            <div className="relative w-fit">
                <div className="grid grid-cols-3">
                    {board.map((row, rowIndex) => {
                        return row.map((cell, colIndex) => {
                            const MarkIcon: TablerIcon | null =
                                cell === null ? null : MARK_ICONS[cell];
                            return (
                                <button
                                    key={`${rowIndex}-${colIndex}`}
                                    onClick={() => handlePlay(rowIndex, colIndex)}
                                    disabled={isGameOver}
                                    className="flex h-25 w-25 items-center justify-center"
                                >
                                    {MarkIcon && <MarkIcon size={48} />}
                                </button>
                            );
                        });
                    })}
                </div>
                {winningLine && (
                    <svg
                        viewBox="0 0 3 3"
                        className="pointer-events-none absolute inset-0 h-full w-full"
                    >
                        <line
                            x1={startCol}
                            y1={startRow}
                            x2={endCol}
                            y2={endRow}
                            pathLength={1}
                            strokeDasharray={1}
                            stroke="red"
                            strokeWidth={0.1}
                            strokeLinecap="round"
                            className="draw-line"
                        />
                    </svg>
                )}
            </div>
            <Button onClick={handleReset}>リセット</Button>
        </div>
    );
}
