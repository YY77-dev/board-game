import Link from "next/link";
import { Button } from "@mantine/core";

export default function Home() {
    return (
        <>
            <Link href="/tic-tac-toe">
                <Button>Tic-Tac-Toe</Button>
            </Link>
            <Link href="/lights-out">
                <Button>Lights Out</Button>
            </Link>
        </>
    );
}