import { Avatar, Button, Menu } from '@mantine/core';

export default function AvatarMenu() {
    return (
        <Menu width={200} position="bottom-start">
            <Menu.Target>
                <Avatar />
            </Menu.Target>

            <Menu.Dropdown>
                <Menu.Item>Dashboard</Menu.Item>

                <Menu.Sub>
                    <Menu.Sub.Target>
                        <Menu.Sub.Item>Products</Menu.Sub.Item>
                    </Menu.Sub.Target>

                    <Menu.Sub.Dropdown>
                        <Menu.Item>All products</Menu.Item>
                        <Menu.Item>Categories</Menu.Item>
                        <Menu.Item>Tags</Menu.Item>
                        <Menu.Item>Attributes</Menu.Item>
                        <Menu.Item>Shipping classes</Menu.Item>
                    </Menu.Sub.Dropdown>
                </Menu.Sub>

                <Menu.Sub>
                    <Menu.Sub.Target>
                        <Menu.Sub.Item>Orders</Menu.Sub.Item>
                    </Menu.Sub.Target>

                    <Menu.Sub.Dropdown>
                        <Menu.Item>Open</Menu.Item>
                        <Menu.Item>Completed</Menu.Item>
                        <Menu.Item>Cancelled</Menu.Item>
                    </Menu.Sub.Dropdown>
                </Menu.Sub>

                <Menu.Sub>
                    <Menu.Sub.Target>
                        <Menu.Sub.Item>Settings</Menu.Sub.Item>
                    </Menu.Sub.Target>

                    <Menu.Sub.Dropdown>
                        <Menu.Item>Profile</Menu.Item>
                        <Menu.Item>Security</Menu.Item>
                        <Menu.Item>Notifications</Menu.Item>
                    </Menu.Sub.Dropdown>
                </Menu.Sub>
            </Menu.Dropdown>
        </Menu>
    );
}