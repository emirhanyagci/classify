"use client";

import { Stack, Text, Card, Group, ThemeIcon } from "@mantine/core";
import { FileText } from "lucide-react";

interface WorksTabProps {
    classId: number;
}

export default function WorksTab({ classId }: WorksTabProps) {
    return (
        <Stack gap="lg" py="xl">
            <Card withBorder radius="md" p="xl">
                <Group gap="md">
                    <ThemeIcon size="xl" radius="md" variant="light" color="green">
                        <FileText size={24} />
                    </ThemeIcon>
                    <Stack gap={4}>
                        <Text fw={600} size="lg">Class Works</Text>
                        <Text c="dimmed" size="sm">
                            Assignments, materials, and student submissions
                        </Text>
                    </Stack>
                </Group>
            </Card>

            <Text c="dimmed" ta="center" py="xl">
                No works yet. Create assignments or upload materials.
            </Text>
        </Stack>
    );
}

