"use client";

import {
    Title,
    Text,
    Group,
    Stack,
    Button,
    Box,
    Image,
    Badge,
    CopyButton,
    Tooltip,
    ActionIcon,
} from "@mantine/core";
import { Pencil, Copy, Check } from "lucide-react";

interface ClassHeaderProps {
    classData: {
        name: string;
        description: string;
        joinCode: string;
    };
    headerImage: string;
    onCustomizeClick: () => void;
}

export default function ClassHeader({
    classData,
    headerImage,
    onCustomizeClick,
}: ClassHeaderProps) {
    return (
        <Box
            style={{
                borderRadius: "var(--mantine-radius-lg)",
                overflow: "hidden",
                position: "relative",
            }}
        >
            {/* Background Image */}
            <Box
                style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: `url(${headerImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            />
            {/* Overlay */}
            <Box
                style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to right, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 100%)",
                }}
            />

            {/* Join Code Badge - Top Right */}
            <Box
                style={{
                    position: "absolute",
                    top: 16,
                    right: 16,
                    zIndex: 2,
                }}
            >
                <CopyButton value={classData.joinCode} timeout={2000}>
                    {({ copied, copy }) => (
                        <Tooltip label={copied ? "Copied!" : "Click to copy class code"} withArrow>
                            <Badge
                                size="lg"
                                variant="white"
                                color="dark"
                                radius="md"
                                style={{
                                    cursor: "pointer",
                                    paddingRight: 8,
                                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
                                }}
                                onClick={copy}
                                rightSection={
                                    copied ? (
                                        <Check size={14} style={{ marginLeft: 4 }} />
                                    ) : (
                                        <Copy size={14} style={{ marginLeft: 4 }} />
                                    )
                                }
                            >
                                {classData.joinCode}
                            </Badge>
                        </Tooltip>
                    )}
                </CopyButton>
            </Box>

            <Group
                align="flex-end"
                gap="xl"
                p="xl"
                wrap="nowrap"
                style={{ position: "relative", zIndex: 1, minHeight: 200 }}
            >
                {/* Cover Image */}
                <Box
                    style={{
                        flexShrink: 0,
                        borderRadius: "var(--mantine-radius-md)",
                        overflow: "hidden",
                        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.3)",
                    }}
                >
                    <Image
                        src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
                        alt={classData.name}
                        w={160}
                        h={160}
                        fit="cover"
                    />
                </Box>

                {/* Class Info */}
                <Stack gap={8} style={{ flex: 1, minWidth: 0 }}>
                    <Title
                        order={1}
                        c="white"
                        style={{
                            fontSize: "clamp(1.75rem, 4vw, 3rem)",
                            fontWeight: 800,
                            lineHeight: 1.1,
                            textShadow: "0 2px 8px rgba(0,0,0,0.3)",
                        }}
                    >
                        {classData.name}
                    </Title>
                    <Text size="lg" c="rgba(255,255,255,0.85)" lineClamp={2}>
                        {classData.description}
                    </Text>
                </Stack>

                {/* Customize Button */}
                <Button
                    variant="white"
                    color="dark"
                    size="md"
                    radius="xl"
                    leftSection={<Pencil size={16} />}
                    onClick={onCustomizeClick}
                    style={{
                        flexShrink: 0,
                        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
                    }}
                >
                    Customize
                </Button>
            </Group>
        </Box>
    );
}
