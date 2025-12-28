"use client";

import { Button, Modal, Stack, TextInput, Textarea, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useCreateClassMutation, GetMyClassesDocument } from "@/graphql/generated/graphql";

export default function AddClassModal() {
    const [opened, { open, close }] = useDisclosure(false);
    const [createClass, { loading, error }] = useCreateClassMutation({
        refetchQueries: [{ query: GetMyClassesDocument }],
        onCompleted: () => {
            form.reset();
            close();
        },
    });

    const form = useForm({
        initialValues: {
            name: "",
            description: "",
        },
        validate: {
            name: (value) => {
                if (!value.trim()) return "Class name is required";
                if (value.length > 100) return "Class name must be 100 characters or less";
                return null;
            },
            description: (value) => {
                if (!value.trim()) return "Description is required";
                return null;
            },
        },
    });

    const handleSubmit = async (values: typeof form.values) => {
        await createClass({
            variables: {
                input: {
                    name: values.name.trim(),
                    description: values.description.trim(),
                },
            },
        });
    };

    const handleClose = () => {
        form.reset();
        close();
    };

    return (
        <>
            <Modal
                opened={opened}
                onClose={handleClose}
                title="Create New Class"
                centered
            >
                <form onSubmit={form.onSubmit(handleSubmit)}>
                    <Stack>
                        <TextInput
                            label="Class Name"
                            placeholder="Enter class name"
                            required
                            maxLength={100}
                            {...form.getInputProps("name")}
                        />

                        <Textarea
                            label="Description"
                            placeholder="Enter class description"
                            required
                            minRows={3}
                            autosize
                            maxRows={6}
                            {...form.getInputProps("description")}
                        />

                        {error && (
                            <div style={{ color: "var(--mantine-color-red-6)", fontSize: "14px" }}>
                                {error.message || "Failed to create class"}
                            </div>
                        )}

                        <Group justify="flex-end" mt="md">
                            <Button variant="subtle" onClick={handleClose} disabled={loading}>
                                Cancel
                            </Button>
                            <Button type="submit" loading={loading}>
                                Create Class
                            </Button>
                        </Group>
                    </Stack>
                </form>
            </Modal>

            <Button variant="light" onClick={open}>+ Add Class</Button>
        </>
    );
}

