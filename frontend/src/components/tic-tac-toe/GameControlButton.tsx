import { Button } from '@mantine/core';

type GameControlButtonProps = {
    isStarted: boolean;
    isPlaying: boolean;
    onStart: () => void;
    onResetClick: () => void;
    onReplay: () => void;
};

export default function GameControlButton({
    isStarted,
    isPlaying,
    onStart,
    onResetClick,
    onReplay,
}: GameControlButtonProps) {
    let buttonLabel: string;
    let handleButtonClick: () => void;
    if (!isStarted) {
        buttonLabel = 'スタート';
        handleButtonClick = onStart;
    } else if (isPlaying) {
        buttonLabel = 'リセット';
        handleButtonClick = onResetClick;
    } else {
        buttonLabel = 'リプレイ';
        handleButtonClick = onReplay;
    }

    return <Button onClick={handleButtonClick}>{buttonLabel}</Button>;
}
