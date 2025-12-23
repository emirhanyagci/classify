"use client"

import { useGetClassesQuery } from "@/graphql/generated/graphql";
import { ClassCard, Loader } from "@classify/ui";
import { Button, Group, SimpleGrid, Title } from "@mantine/core";

export default function Index() {
    const { data, loading, error } = useGetClassesQuery();

    console.log(data);


    if (loading) {
        return <Loader />
    }
    if (error) {
        return <div>Error: {error.message}</div>
    }
    return (
        <>
            <Group justify="space-between" mb="md">
                <Title>Classes</Title>
                <Button variant="light">+ Add Class</Button>
            </Group>
            <SimpleGrid cols={{ base: 1, md: 2, lg: 3 }}>
                {data?.classes.map((cls) => (
                    <ClassCard key={cls.id} name={cls.name} description={cls.description} image="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png" badgeText="Badge Text" />
                ))}

            </SimpleGrid>
        </>
    );
}
