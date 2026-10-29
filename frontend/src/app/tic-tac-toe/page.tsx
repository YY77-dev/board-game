'use client';

import { useEffect, useState } from 'react';
import { Button, Group, Modal, SegmentedControl, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { type TablerIcon, IconCircle, IconX } from '@tabler/icons-react';

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

const MARK_ICONS: Record<Player, TablerIcon> = {
    O: IconCircle,
    X: IconX,
};

const CIRCLE_MARK: TablerIcon = MARK_ICONS[CIRCLE];
const CROSS_MARK: TablerIcon = MARK_ICONS[CROSS];

const CELL_CENTER: number = 0.5;
const LINE_EXTENSION: number = 0.4;

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
            <SegmentedControl
                value={humanPlayer}
                onChange={setHumanPlayer}
                disabled={isPlaying}
                data={[
                    {
                        label: (
                            <span className="flex items-center justify-center gap-1">
                                先攻 :<CIRCLE_MARK size={16} />
                            </span>
                        ),
                        value: CIRCLE,
                    },
                    {
                        label: (
                            <span className="flex items-center justify-center gap-1">
                                後攻 :<CROSS_MARK size={16} />
                            </span>
                        ),
                        value: CROSS,
                    },
                ]}
            />
            <p className="flex min-h-7 items-center">
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
                                    disabled={!isPlaying || isCpuTurn}
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
            <Button onClick={handleButtonClick}>{buttonLabel}</Button>
            <Modal
                opened={resetModalOpened}
                onClose={resetModal.close}
                title="ゲームをリセットしますか？"
                centered
            >
                <Text size="sm">この操作は取り消せません</Text>
                <Group justify="flex-end" mt="md">
                    <Button variant="default" onClick={resetModal.close}>
                        キャンセル
                    </Button>
                    <Button color="red" onClick={handleReset}>
                        リセット
                    </Button>
                </Group>
            </Modal>
        </div>
    );
}
