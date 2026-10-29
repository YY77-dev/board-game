import MarkIcon from '@/components/tic-tac-toe/MarkIcon';
import WinningLine from '@/components/tic-tac-toe/WinningLine';
import { type Board, type Line } from '@/lib/tic-tac-toe/logic';

type BoardSurfaceProps = {
    board: Board;
    onPlay: (rowIndex: number, colIndex: number) => void;
    disabled: boolean;
    winningLine: Line | null;
};

export default function BoardSurface({ board, onPlay, disabled, winningLine }: BoardSurfaceProps) {
    return (
        <div className="relative w-fit">
            <div className="grid grid-cols-3">
                {board.map((row, rowIndex) => {
                    return row.map((cell, colIndex) => {
                        return (
                            <button
                                key={`${rowIndex}-${colIndex}`}
                                onClick={() => onPlay(rowIndex, colIndex)}
                                disabled={disabled}
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
    );
}
