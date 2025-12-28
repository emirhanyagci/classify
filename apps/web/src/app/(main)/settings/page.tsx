"use client"

import { Title, Paper, Stack, TextInput, Button, Avatar, Group, Divider } from "@mantine/core";
import { useUser } from "@/contexts/UserContext";
import ChangeAvatar from "@/components/ChangeAvatar";
import { useDisclosure } from "@mantine/hooks";

export default function SettingsPage() {
    const { user } = useUser();
    console.log(user);

    const [opened, { open, close }] = useDisclosure(false);
    return (
        <>
            <Title mb="lg">Settings</Title>

            <Stack gap="xl">

                {/* Profile Section */}
                <Paper p="lg" radius="md" withBorder>
                    <Title order={3} mb="md">Profile</Title>
                    <Group align="flex-start" gap="xl">
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Avatar
                                size={100}
                                radius="xl"
                                color="blue"
                                mb="sm"
                                src={user?.imageUrl}
                            >
                                {user?.email?.charAt(0).toUpperCase()}
                            </Avatar>
                            <ChangeAvatar opened={opened} open={open} close={close} />
                        </div>
                        <Stack gap="md" style={{ flex: 1 }}>
                            <TextInput
                                label="Email"
                                value={user?.email || ""}
                                disabled
                            />
                        </Stack>
                    </Group>
                </Paper>

                <Divider />

                {/* Account Section */}
                <Paper p="lg" radius="md" withBorder>
                    <Title order={3} mb="md">Account</Title>
                    <Stack gap="md">
                        <Button variant="light" color="red">
                            Change Password
                        </Button>
                    </Stack>
                </Paper>
            </Stack>
        </>
    );
}

