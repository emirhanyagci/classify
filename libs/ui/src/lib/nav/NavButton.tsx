import { Button } from "@mantine/core";
import Link from "next/link";
import { NavItem } from ".";
import { DynamicIcon } from "lucide-react/dynamic";

export function NavButton({ label, route, icon }: NavItem) {
    return <Link href={route} style={{ textDecoration: "none" }}><Button size="md" fullWidth justify="space-between" leftSection={<DynamicIcon name={icon} />} rightSection={<DynamicIcon name={icon} opacity={0} />}>  {label}</Button></Link>
}