import { SegmentedControl } from '@mantine/core';

import MarkIcon from '@/components/tic-tac-toe/MarkIcon';
import { type Player, CIRCLE, CROSS } from '@/lib/tic-tac-toe/logic';

type TurnOrderSelectorProps = {
    value: Player;
    onChange: (player: Player) => void;
    disabled: boolean;
};

type TurnOrderOption = {
    order: string;
    mark: Player;
};

const TURN_ORDER_OPTIONS: TurnOrderOption[] = [
    { order: '先攻', mark: CIRCLE },
    { order: '後攻', mark: CROSS },
];

export default function TurnOrderSelector({ value, onChange, disabled }: TurnOrderSelectorProps) {
    return (
        <SegmentedControl<Player>
            value={value}
            onChange={onChange}
            disabled={disabled}
            data={TURN_ORDER_OPTIONS.map((option) => {
                return {
                    value: option.mark,
                    label: (
                        <span className="flex items-center justify-center gap-1">
                            {option.order} :
                            <MarkIcon mark={option.mark} size={16} />
                        </span>
                    ),
                };
            })}
        />
    );
}
