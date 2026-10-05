export type Player = "O" | "X";
export type Cell = Player | null;
export type Board = Cell[][];
export type Coordinate = [number, number];
export type Line = [Coordinate, Coordinate, Coordinate];

const BOARD_SIZE = 3;

const LINES: Line[] = [
    [[0, 0], [0, 1], [0, 2]],
    [[1, 0], [1, 1], [1, 2]],
    [[2, 0], [2, 1], [2, 2]],
    [[0, 0], [1, 0], [2, 0]],
    [[0, 1], [1, 1], [2, 1]],
    [[0, 2], [1, 2], [2, 2]],
    [[0, 0], [1, 1], [2, 2]],
    [[0, 2], [1, 1], [2, 0]]
];

export function createEmptyBoard(): Board {
    const board: Board = [];
    for (let i = 0; i < BOARD_SIZE; i++) {
        board.push(Array(BOARD_SIZE).fill(null));
    }
    return board;
}

export function getCurrentPlayer(board: Board): Player {
    const filledCell = board.flat().filter((cell) => cell !== null).length;
    const currentPlayer = filledCell % 2 === 0 ? "O" : "X";
    return currentPlayer;
}

export function getWinningLine(board: Board): Line | null {
    for (const line of LINES) {
        const [[row1, col1], [row2, col2], [row3, col3]] = line;
        const cell1 = board[row1][col1];
        const cell2 = board[row2][col2];
        const cell3 = board[row3][col3];

        if (cell1 !== null && cell1 === cell2 && cell1 === cell3) return line;
    }
    return null;
}

export function getWinner(board: Board): Player | null {
    const winningLine = getWinningLine(board);
    if (winningLine === null) return null;
    const [row, col] = winningLine[0];
    const winner = board[row][col];
    return winner;
}

export function play(board: Board, row: number, col: number): Board {
    if (board[row][col] !== null || getWinningLine(board) !== null) return board;
    const mark = getCurrentPlayer(board);
    const newBoard = board.map((cells) => cells.slice());
    newBoard[row][col] = mark;
    return newBoard;
}