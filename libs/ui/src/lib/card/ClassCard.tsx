import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';

export function ClassCard({ name, description, image, badgeText }: { name: string, description: string, image: string, badgeText?: string }) {
    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Card.Section>
                <Image
                    src={image}
                    height={160}
                    alt="Norway"
                />
            </Card.Section>

            <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500}>{name}</Text>
                {badgeText && <Badge color="pink">{badgeText}</Badge>}
            </Group>

            <Text size="sm" c="dimmed">
                {description}
            </Text>

            <Button color="blue" fullWidth mt="md" radius="md">
                Go
            </Button>
        </Card>
    );
}