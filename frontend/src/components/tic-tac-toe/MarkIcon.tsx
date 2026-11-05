import { type TablerIcon, IconCircle, IconX } from '@tabler/icons-react';

import { type Player, CIRCLE, CROSS } from '@/lib/tic-tac-toe/logic';

type MarkIconProps = {
    mark: Player;
    size: number;
};

const MARK_ICONS: Record<Player, TablerIcon> = {
    [CIRCLE]: IconCircle,
    [CROSS]: IconX,
};

const MARK_COLOR_CLASSES: Record<Player, string> = {
    [CIRCLE]: 'text-ttt-circle',
    [CROSS]: 'text-ttt-cross',
};

export default function MarkIcon({ mark, size }: MarkIconProps) {
    const Icon: TablerIcon = MARK_ICONS[mark];
    const colorClass: string = MARK_COLOR_CLASSES[mark];
    return <Icon size={size} className={colorClass} />;
}
