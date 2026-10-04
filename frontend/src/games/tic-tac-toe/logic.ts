export type Player = "O" | "X"
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
