"use client";

import { useGetClassQuery } from "@/graphql/generated/graphql";
import { Loader } from "@classify/ui";
import {
    Text,
    Stack,
    Button,
    Container,
    Tabs,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useParams } from "next/navigation";
import { ArrowLeft, Activity, FileText, Users } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { ClassHeader, FlowTab, WorksTab, CustomizeClassModal, MembersTab } from "./_components";

const DEFAULT_HEADER_IMAGE = "https://www.gstatic.com/classroom/themes/img_breakfast.jpg";

export default function ClassPage() {
    const params = useParams();
    const publicId = params.id as string;
    const [opened, { open, close }] = useDisclosure(false);

    const [headerImage, setHeaderImage] = useState(DEFAULT_HEADER_IMAGE);
    const [selectedColor, setSelectedColor] = useState("white");

    const { data, loading, error } = useGetClassQuery({
        variables: { publicId },
        skip: !publicId,
    });

    const handleSave = (newHeaderImage: string, newSelectedColor: string) => {
        setHeaderImage(newHeaderImage);
        setSelectedColor(newSelectedColor);
        close();
    };

    if (!publicId) {
        return (
            <Stack align="center" justify="center" h={300}>
                <Text c="red" size="lg">Invalid class ID</Text>
                <Button component={Link} href="/classes" leftSection={<ArrowLeft size={16} />}>
                    Back to Classes
                </Button>
            </Stack>
        );
    }

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return (
            <Stack align="center" justify="center" h={300}>
                <Text c="red" size="lg">Error: {error.message}</Text>
                <Button component={Link} href="/classes" leftSection={<ArrowLeft size={16} />}>
                    Back to Classes
                </Button>
            </Stack>
        );
    }

    if (!data?.class) {
        return (
            <Stack align="center" justify="center" h={300}>
                <Text c="dimmed" size="lg">Class not found</Text>
                <Button component={Link} href="/classes" leftSection={<ArrowLeft size={16} />}>
                    Back to Classes
                </Button>
            </Stack>
        );
    }

    const classData = data.class;

    return (
        <Container size="lg">
            {/* Header */}
            <ClassHeader
                classData={classData}
                headerImage={headerImage}
                onCustomizeClick={open}
            />

            {/* Tabs */}
            <Tabs defaultValue="flow" mt="xl">
                <Tabs.List grow>
                    <Tabs.Tab value="flow" leftSection={<Activity size={16} />}>
                        Flow
                    </Tabs.Tab>
                    <Tabs.Tab value="works" leftSection={<FileText size={16} />}>
                        Works
                    </Tabs.Tab>
                    <Tabs.Tab value="members" leftSection={<Users size={16} />}>
                        Members
                    </Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="flow">
                    <FlowTab classId={parseInt(classData.id, 10)} />
                </Tabs.Panel>

                <Tabs.Panel value="works">
                    <WorksTab classId={parseInt(classData.id, 10)} />
                </Tabs.Panel>
                <Tabs.Panel value="members">
                    <MembersTab />
                </Tabs.Panel>

            </Tabs>

            {/* Customize Modal */}
            <CustomizeClassModal
                opened={opened}
                onClose={close}
                headerImage={headerImage}
                selectedColor={selectedColor}
                onSave={handleSave}
            />
        </Container>
    );
}
