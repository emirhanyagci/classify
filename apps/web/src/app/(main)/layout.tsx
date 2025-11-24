"use client"
import { AppShell, Burger, Group } from "@mantine/core";
import { useDisclosure, useLocalStorage } from '@mantine/hooks';
import { AvatarMenu, Nav } from "@classify/ui"
export default function MainLayout({ children }: { children: React.ReactNode }) {
    const [opened, { toggle }] = useDisclosure();
    const [openedLS, setOpenedLS] = useLocalStorage({
        key: 'nav-collapsed',
        defaultValue: true,
    });
    function toggleHandler() {
        toggle()
        setOpenedLS(opened)
    }
    return (<AppShell
        header={{ height: 64 }}
        navbar={{ width: !openedLS ? 300 : 80, breakpoint: 'md', collapsed: { mobile: !opened } }}
        padding="md"
    >
        <AppShell.Header>
            <Group h="100%" px="md" justify="space-between">
                <div>
                    <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="md" />
                    <Burger opened={false} onClick={toggleHandler} size="sm" visibleFrom="md" />
                </div>
                <AvatarMenu />

            </Group>
        </AppShell.Header>
        <AppShell.Navbar p="md" hiddenFrom="md">
            <Nav />
        </AppShell.Navbar>
        {/* Pc options */}
        <AppShell.Navbar p="md" visibleFrom="md">
            <Nav collapsed={openedLS ? true : false} />
        </AppShell.Navbar>
        <AppShell.Main>
            {children}
        </AppShell.Main>
    </AppShell >)
}