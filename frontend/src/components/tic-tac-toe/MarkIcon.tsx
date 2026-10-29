import { type TablerIcon, IconCircle, IconX } from '@tabler/icons-react';

import { type Player } from '@/lib/tic-tac-toe/logic';

type MarkIconProps = {
    mark: Player;
    size: number;
};

const MARK_ICONS: Record<Player, TablerIcon> = {
    O: IconCircle,
    X: IconX,
};

export default function MarkIcon({ mark, size }: MarkIconProps) {
    const Icon: TablerIcon = MARK_ICONS[mark];
    return <Icon size={size} />;
}
