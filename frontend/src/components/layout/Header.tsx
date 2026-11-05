'use client';

import Link from 'next/link';
import { ActionIcon, Anchor, Burger, Group, Title, useMantineColorScheme } from '@mantine/core';
import { IconMoon, IconSun } from '@tabler/icons-react';

type HeaderProps = {
    opened: boolean;
    onToggle: () => void;
};

export default function Header({ opened, onToggle }: HeaderProps) {
    const { toggleColorScheme } = useMantineColorScheme();

    return (
        <Group h="100%" px="md" justify="space-between">
            <Group>
                <Burger
                    opened={opened}
                    onClick={onToggle}
                    hiddenFrom="sm"
                    size="sm"
                    aria-label="メニューを開閉"
                />
                <Title order={1}>
                    <Anchor component={Link} href="/" c="inherit" underline="never" inherit>
                        header
                    </Anchor>
                </Title>
            </Group>
            <ActionIcon
                variant="default"
                size="lg"
                onClick={toggleColorScheme}
                aria-label="カラーモードを切替"
            >
                <IconMoon className="dark:hidden" />
                <IconSun className="hidden dark:block" />
            </ActionIcon>
        </Group>
    );
}
