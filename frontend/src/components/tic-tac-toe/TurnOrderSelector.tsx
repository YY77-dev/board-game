import { SegmentedControl } from '@mantine/core';

import MarkIcon from '@/components/tic-tac-toe/MarkIcon';
import { type Player, CIRCLE, CROSS } from '@/lib/tic-tac-toe/logic';

type TurnOrderSelectorProps = {
    value: Player;
    onChange: (player: Player) => void;
    disabled: boolean;
};

export default function TurnOrderSelector({ value, onChange, disabled }: TurnOrderSelectorProps) {
    return (
        <SegmentedControl<Player>
            value={value}
            onChange={onChange}
            disabled={disabled}
            data={[
                {
                    label: (
                        <span className="flex items-center justify-center gap-1">
                            先攻 :<MarkIcon mark={CIRCLE} size={16} />
                        </span>
                    ),
                    value: CIRCLE,
                },
                {
                    label: (
                        <span className="flex items-center justify-center gap-1">
                            後攻 :<MarkIcon mark={CROSS} size={16} />
                        </span>
                    ),
                    value: CROSS,
                },
            ]}
        />
    );
}
