import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';
import Link from 'next/link';

interface ClassCardProps {
    publicId: string;
    name: string;
    description: string;
    image: string;
    badgeText?: string;
}

export function ClassCard({ publicId, name, description, image, badgeText }: ClassCardProps) {
    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Card.Section>
                <Image
                    src={image}
                    height={160}
                    alt={name}
                />
            </Card.Section>

            <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500}>{name}</Text>
                {badgeText && <Badge color="pink">{badgeText}</Badge>}
            </Group>

            <Text size="sm" c="dimmed" lineClamp={2}>
                {description}
            </Text>

            <Button
                component={Link}
                href={`/classes/${publicId}`}
                color="blue"
                fullWidth
                mt="md"
                radius="md"
            >
                View Class
            </Button>
        </Card>
    );
}