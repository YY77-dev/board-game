'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NavLink } from '@mantine/core';
import { type TablerIcon, IconBulb, IconHome, IconTicTac } from '@tabler/icons-react';

type NavbarProps = {
    onNavigate: () => void;
};

type LinkProps = {
    href: string;
    label: string;
    icon: TablerIcon;
};

export default function Navbar({ onNavigate }: NavbarProps) {
    const links: LinkProps[] = [
        { href: '/', label: 'Home', icon: IconHome },
        { href: '/tic-tac-toe', label: 'Tic Tac Toe', icon: IconTicTac },
        { href: '/lights-out', label: 'Lights-Out', icon: IconBulb },
    ];

    const pathname = usePathname();

    function isActive(pathname: string, href: string): boolean {
        if (href === '/') {
            return pathname === '/';
        }
        return pathname === href || pathname.startsWith(href + '/');
    }

    return (
        <>
            {links.map((link) => {
                const Icon = link.icon;
                return (
                    <NavLink
                        onClick={onNavigate}
                        key={link.href}
                        component={Link}
                        href={link.href}
                        active={isActive(pathname, link.href)}
                        label={link.label}
                        leftSection={<Icon size={18} stroke={1.5} />}
                    />
                );
            })}
        </>
    );
}
