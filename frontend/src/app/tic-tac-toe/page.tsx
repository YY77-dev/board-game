'use client';

import { useEffect, useState } from 'react';
import { Button, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import BoardSurface from '@/components/tic-tac-toe/BoardSurface';
import ResetModal from '@/components/tic-tac-toe/ResetModal';
import StatusMessage from '@/components/tic-tac-toe/StatusMessage';
import TurnOrderSelector from '@/components/tic-tac-toe/TurnOrderSelector';
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
            <Title order={2} className="mb-3">
                Tic Tac Toe
            </Title>
            <TurnOrderSelector value={humanPlayer} onChange={setHumanPlayer} disabled={isPlaying} />
            <StatusMessage
                isStarted={isStarted}
                winner={winner}
                isTieGame={isTieGame}
                currentPlayer={currentPlayer}
            />
            <BoardSurface
                board={board}
                onPlay={handlePlay}
                disabled={!isPlaying || isCpuTurn}
                winningLine={winningLine}
            />
            <Button onClick={handleButtonClick}>{buttonLabel}</Button>
            <ResetModal
                opened={resetModalOpened}
                onClose={resetModal.close}
                onConfirm={handleReset}
            />
        </div>
    );
}
