// 

import Link from "next/link";
import { Button } from "@mantine/core";

export default function LightsOut() {
    return (
        <>
            <Link href="/lights-out">
                <Button>Lights Out</Button>
            </Link>
        </>
    );
}