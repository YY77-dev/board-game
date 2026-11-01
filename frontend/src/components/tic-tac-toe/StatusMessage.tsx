import MarkIcon from '@/components/tic-tac-toe/MarkIcon';
import { type Player } from '@/lib/tic-tac-toe/logic';

type StatusMessageProps = {
    isStarted: boolean;
    winner: Player | null;
    isTieGame: boolean;
    currentPlayer: Player;
};

export default function StatusMessage({
    isStarted,
    winner,
    isTieGame,
    currentPlayer,
}: StatusMessageProps) {
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

    return (
        <p className="flex min-h-7 items-center">
            {statusMark !== null && <MarkIcon mark={statusMark} size={18} />}
            {statusText}
        </p>
    );
}
