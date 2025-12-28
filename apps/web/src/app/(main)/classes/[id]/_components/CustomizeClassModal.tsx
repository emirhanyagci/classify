"use client";

import {
    Text,
    Group,
    Stack,
    Button,
    Box,
    Modal,
    UnstyledButton,
} from "@mantine/core";
import { ImageIcon, Upload, Check } from "lucide-react";
import { useState, useEffect } from "react";

const THEME_COLORS = [
    { id: "blue", color: "#3B82F6", border: "#2563EB" },
    { id: "green", color: "#86EFAC", border: "#22C55E" },
    { id: "pink", color: "#FBCFE8", border: "#EC4899" },
    { id: "orange", color: "#FED7AA", border: "#F97316" },
    { id: "cyan", color: "#A5F3FC", border: "#06B6D4" },
    { id: "purple", color: "#E9D5FF", border: "#A855F7" },
    { id: "white", color: "#FFFFFF", border: "#9CA3AF" },
];

interface CustomizeClassModalProps {
    opened: boolean;
    onClose: () => void;
    headerImage: string;
    selectedColor: string;
    onSave: (headerImage: string, selectedColor: string) => void;
}

export default function CustomizeClassModal({
    opened,
    onClose,
    headerImage,
    selectedColor,
    onSave,
}: CustomizeClassModalProps) {
    const [tempHeaderImage, setTempHeaderImage] = useState(headerImage);
    const [tempSelectedColor, setTempSelectedColor] = useState(selectedColor);

    // Reset temp states when modal opens
    useEffect(() => {
        if (opened) {
            setTempHeaderImage(headerImage);
            setTempSelectedColor(selectedColor);
        }
    }, [opened, headerImage, selectedColor]);

    const handleSave = () => {
        onSave(tempHeaderImage, tempSelectedColor);
    };

    const handleCancel = () => {
        onClose();
    };

    return (
        <Modal
            opened={opened}
            onClose={handleCancel}
            title={<Text fw={600} size="xl">Customize Appearance</Text>}
            size="lg"
            radius="lg"
            centered
            styles={{
                body: { padding: "1.5rem" },
                header: { padding: "1.25rem 1.5rem" },
            }}
        >
            <Stack gap="xl">
                {/* Preview Image */}
                <Box
                    style={{
                        borderRadius: "var(--mantine-radius-md)",
                        overflow: "hidden",
                        height: 180,
                        backgroundImage: `url(${tempHeaderImage})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                />

                {/* Header Image Selection */}
                <Box>
                    <Group justify="space-between" align="center">
                        <Text fw={500} size="md">Select header image</Text>
                        <Group gap="sm">
                            <Button
                                variant="light"
                                color="cyan"
                                radius="xl"
                                leftSection={<ImageIcon size={18} />}
                            >
                                Select Photo
                            </Button>
                            <Button
                                variant="outline"
                                color="cyan"
                                radius="xl"
                                leftSection={<Upload size={18} />}
                            >
                                Upload Photo
                            </Button>
                        </Group>
                    </Group>
                </Box>

                {/* Theme Color Selection */}
                <Box>
                    <Text fw={500} size="md" mb="md">Select theme color</Text>
                    <Group gap="md">
                        {THEME_COLORS.map((theme) => (
                            <UnstyledButton
                                key={theme.id}
                                onClick={() => setTempSelectedColor(theme.id)}
                                style={{
                                    width: 56,
                                    height: 56,
                                    borderRadius: "50%",
                                    backgroundColor: theme.color,
                                    border: `2px solid ${tempSelectedColor === theme.id ? theme.border : "transparent"}`,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    transition: "all 0.15s ease",
                                    boxShadow: tempSelectedColor === theme.id
                                        ? `0 0 0 2px white, 0 0 0 4px ${theme.border}`
                                        : "none",
                                }}
                            >
                                {tempSelectedColor === theme.id && (
                                    <Check size={24} color={theme.id === "white" ? "#374151" : theme.border} strokeWidth={3} />
                                )}
                            </UnstyledButton>
                        ))}
                    </Group>
                </Box>

                {/* Action Buttons */}
                <Group justify="flex-end" gap="md" mt="md">
                    <Button variant="subtle" color="blue" onClick={handleCancel}>
                        Cancel
                    </Button>
                    <Button color="blue" onClick={handleSave}>
                        Save
                    </Button>
                </Group>
            </Stack>
        </Modal>
    );
}

