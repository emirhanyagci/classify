"use client";

import { Stack, Text, Card, Group, ThemeIcon } from "@mantine/core";
import { Activity } from "lucide-react";

interface FlowTabProps {
    classId: number;
}

export default function FlowTab({ classId }: FlowTabProps) {
    return (
        <Stack gap="lg" py="xl">
            <Card withBorder radius="md" p="xl">
                <Group gap="md">
                    <ThemeIcon size="xl" radius="md" variant="light" color="blue">
                        <Activity size={24} />
                    </ThemeIcon>
                    <Stack gap={4}>
                        <Text fw={600} size="lg">Class Flow</Text>
                        <Text c="dimmed" size="sm">
                            View and manage the flow of your class activities
                        </Text>
                    </Stack>
                </Group>
            </Card>

            <Text c="dimmed" ta="center" py="xl">
                No flow items yet. Start adding activities to your class.
            </Text>
        </Stack>
    );
}

