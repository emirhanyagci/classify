import { Avatar, Menu } from '@mantine/core';
import { DynamicIcon } from 'lucide-react/dynamic';
import Link from 'next/link';

export default function AvatarMenu() {
    return (
        <Menu width={200} position="bottom-start">
            <Menu.Target>
                <Avatar />
            </Menu.Target>

            <Menu.Dropdown>
                <Menu.Sub>
                    <Menu.Sub.Target>
                        <Link href="/settings">
                            <Menu.Sub.Item
                                rightSection={<DynamicIcon name="settings" size={16} />}
                            >
                                Settings
                            </Menu.Sub.Item>
                        </Link>
                    </Menu.Sub.Target>
                </Menu.Sub>
            </Menu.Dropdown>
        </Menu>
    );
}
