import Link from "next/link";
import { Button } from "@mantine/core";

export default function Home() {
    return (
        <>
            <Link href="/tic-tac-toe">
                <Button>三目並べ</Button>
            </Link>
            <Link href="/lights-out">
                <Button>Lights Out</Button>
            </Link>
        </>
    );
}