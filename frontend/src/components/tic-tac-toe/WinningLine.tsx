import { type Line } from '@/lib/tic-tac-toe/logic';

type WinningLineProps = {
    line: Line;
};

const CELL_CENTER: number = 0.5;
const LINE_EXTENSION: number = 0.4;

export default function WinningLine({ line }: WinningLineProps) {
    const [[fromRow, fromCol], , [toRow, toCol]] = line;

    const directionRow: number = Math.sign(toRow - fromRow);
    const directionCol: number = Math.sign(toCol - fromCol);

    const startRow: number = fromRow + CELL_CENTER - LINE_EXTENSION * directionRow;
    const startCol: number = fromCol + CELL_CENTER - LINE_EXTENSION * directionCol;
    const endRow: number = toRow + CELL_CENTER + LINE_EXTENSION * directionRow;
    const endCol: number = toCol + CELL_CENTER + LINE_EXTENSION * directionCol;

    return (
        <svg viewBox="0 0 3 3" className="pointer-events-none absolute inset-0 h-full w-full">
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
    );
}
