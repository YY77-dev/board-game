'use client';

import { AppShell } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import Navbar from '@/components/layout/Navbar';

export function AppLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [opened, { toggle, close }] = useDisclosure();

    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{
                width: 150,
                breakpoint: 'sm',
                collapsed: { mobile: !opened },
            }}
            footer={{ height: 30 }}
            padding="md"
        >
            <AppShell.Header>
                <Header opened={opened} onToggle={toggle} />
            </AppShell.Header>
            <AppShell.Navbar p="sm">
                <Navbar onNavigate={close} />
            </AppShell.Navbar>
            <AppShell.Main>{children}</AppShell.Main>
            <AppShell.Footer>
                <Footer />
            </AppShell.Footer>
        </AppShell>
    );
}
