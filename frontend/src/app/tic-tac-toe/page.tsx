'use client';

import { useEffect, useState } from 'react';
import { Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import MarkIcon from '@/components/tic-tac-toe/MarkIcon';
import ResetModal from '@/components/tic-tac-toe/ResetModal';
import TurnOrderSelector from '@/components/tic-tac-toe/TurnOrderSelector';
import WinningLine from '@/components/tic-tac-toe/WinningLine';
import {
    type Board,
    type Coordinate,
    type Line,
    type Player,
    CIRCLE,
    CROSS,
    createEmptyBoard,
    getCurrentPlayer,
    getRandomMove,
    getWinner,
    getWinningLine,
    isDraw,
    play,
} from '@/lib/tic-tac-toe/logic';

const CPU_DELAY_MS: number = 500;

export default function TicTacToe() {
    const [board, setBoard] = useState<Board>(createEmptyBoard);
    const [isStarted, setIsStarted] = useState<boolean>(false);
    const [humanPlayer, setHumanPlayer] = useState<Player>(CIRCLE);
    const cpuPlayer: Player = humanPlayer === CIRCLE ? CROSS : CIRCLE;
    const [resetModalOpened, resetModal] = useDisclosure(false);

    const currentPlayer: Player = getCurrentPlayer(board);
    const winner: Player | null = getWinner(board);
    const isTieGame: boolean = isDraw(board);
    const isGameOver: boolean = winner !== null || isTieGame;
    const isPlaying: boolean = isStarted && !isGameOver;
    const isCpuTurn: boolean = isPlaying && currentPlayer === cpuPlayer;

    let statusMark: Player | null;
    let statusText: string;
    if (!isStarted) {
        statusMark = null;
        statusText = '';
    } else if (winner !== null) {
        statusMark = winner;
        statusText = 'の勝ち！';
    } else if (isTieGame) {
        statusMark = null;
        statusText = '引き分け！';
    } else {
        statusMark = currentPlayer;
        statusText = 'の番';
    }

    const winningLine: Line | null = getWinningLine(board);

    const handlePlay = (rowIndex: number, colIndex: number) => {
        if (isCpuTurn) return;
        setBoard(play(board, rowIndex, colIndex));
    };

    useEffect(() => {
        if (!isCpuTurn || resetModalOpened) return;

        const cpuTurnTimer = setTimeout(() => {
            const cpuMove: Coordinate | null = getRandomMove(board);
            if (cpuMove !== null) {
                setBoard(play(board, cpuMove[0], cpuMove[1]));
            }
        }, CPU_DELAY_MS);

        return () => clearTimeout(cpuTurnTimer);
    }, [board, isCpuTurn, resetModalOpened]);

    const handleStarted = () => {
        setIsStarted(true);
    };

    const handleReset = () => {
        setIsStarted(false);
        setBoard(createEmptyBoard());
        resetModal.close();
    };

    const handleReplay = () => {
        setBoard(createEmptyBoard());
    };

    let buttonLabel: string;
    let handleButtonClick: () => void;
    if (!isStarted) {
        buttonLabel = 'スタート';
        handleButtonClick = handleStarted;
    } else if (isPlaying) {
        buttonLabel = 'リセット';
        handleButtonClick = resetModal.open;
    } else {
        buttonLabel = 'リプレイ';
        handleButtonClick = handleReplay;
    }

    return (
        <div className="flex flex-col items-center">
            <h1>Tic Tac Toe</h1>
            <TurnOrderSelector value={humanPlayer} onChange={setHumanPlayer} disabled={isPlaying} />
            <p className="flex min-h-7 items-center">
                {statusMark !== null && <MarkIcon mark={statusMark} size={18} />}
                {statusText}
            </p>
            <div className="relative w-fit">
                <div className="grid grid-cols-3">
                    {board.map((row, rowIndex) => {
                        return row.map((cell, colIndex) => {
                            return (
                                <button
                                    key={`${rowIndex}-${colIndex}`}
                                    onClick={() => handlePlay(rowIndex, colIndex)}
                                    disabled={!isPlaying || isCpuTurn}
                                    className="flex h-25 w-25 items-center justify-center"
                                >
                                    {cell !== null && <MarkIcon mark={cell} size={48} />}
                                </button>
                            );
                        });
                    })}
                </div>
                {winningLine !== null && <WinningLine line={winningLine} />}
            </div>
            <Button onClick={handleButtonClick}>{buttonLabel}</Button>
            <ResetModal
                opened={resetModalOpened}
                onClose={resetModal.close}
                onConfirm={handleReset}
            />
        </div>
    );
}
