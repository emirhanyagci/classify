import { Stack, Card, Group, ThemeIcon } from "@mantine/core";
import { Activity } from "lucide-react";
export default function MembersTab() {
    return (
        <Stack gap="lg" py="xl">
            <Card withBorder radius="md" p="xl">
                <Group gap="md">
                    <ThemeIcon size="xl" radius="md" variant="light" color="blue">
                        <Activity size={24} />
                    </ThemeIcon>
                </Group>
            </Card>
        </Stack>
    );
}