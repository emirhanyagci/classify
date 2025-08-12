import { Button, Tooltip } from "@mantine/core";
import Link from "next/link";
import { NavItem } from ".";
import { DynamicIcon } from "lucide-react/dynamic";

export function NavButtonCollapsed({ label, route, icon }: NavItem) {
    return <Link href={route} style={{ textDecoration: "none" }}>
        <Tooltip label={label}>
            <Button p={0} size="md" fullWidth>
                <DynamicIcon name={icon} />
            </Button>
        </Tooltip>
    </Link>
}