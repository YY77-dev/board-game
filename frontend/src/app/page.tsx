import { Button, Container, Title } from '@mantine/core';

export default function Home() {
    return (
        <Container className="py-16">
            <Title order={1} className="mb-4 text-blue-600 dark:text-blue-300">
                My App
            </Title>
            <Button>Mantine のボタン</Button>
        </Container>
    );
}
