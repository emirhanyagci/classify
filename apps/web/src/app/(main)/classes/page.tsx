"use client"

import AddClassModal from "@/components/AddClassModal";
import { useGetMyClassesLazyQuery, useGetMyClassesQuery } from "@/graphql/generated/graphql";
import { ClassCard, Loader } from "@classify/ui";
import { Group, SimpleGrid, Title } from "@mantine/core";

export default function Index() {
    const { data, loading, error } = useGetMyClassesQuery();

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
                <AddClassModal />
            </Group>
            <SimpleGrid cols={{ base: 1, md: 2, lg: 3 }}>
                {data?.myClasses.map((cls) => (
                    <ClassCard key={cls.id} name={cls.name} description={cls.description} image="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png" badgeText="Badge Text" />
                ))}

            </SimpleGrid>
        </>
    );
}
