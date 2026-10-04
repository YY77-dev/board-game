export type Player = "O" | "X";
export type Cell = Player | null;
export type Board = Cell[][];

const BOARD_SIZE = 3;

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

export function play(board: Board, row: number, col: number): Board {
    if (board[row][col] !== null) return board;
    const mark = getCurrentPlayer(board);
    const newBoard = board.map((cells) => cells.slice());
    newBoard[row][col] = mark;
    return newBoard;
}