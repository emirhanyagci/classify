import { Avatar, Menu } from '@mantine/core';

export default function AvatarMenu() {
    return (
        <Menu width={200} position="bottom-start">
            <Menu.Target>
                <Avatar />
            </Menu.Target>

            <Menu.Dropdown>

                <Menu.Sub>
                    <Menu.Sub.Target>
                        <Menu.Sub.Item>Settings</Menu.Sub.Item>
                    </Menu.Sub.Target>
                </Menu.Sub>
            </Menu.Dropdown>
        </Menu>
    );
}