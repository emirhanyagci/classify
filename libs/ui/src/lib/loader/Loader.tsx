import { Loader as MantineLoader, LoaderProps, Center, Stack, Text } from '@mantine/core';

export interface LoaderComponentProps extends LoaderProps {
    /** Optional text to display below the loader */
    label?: string;
    /** Whether to center the loader in its container */
    centered?: boolean;
    /** Size of the loader */
    size?: LoaderProps['size'];
    /** Color of the loader */
    color?: LoaderProps['color'];
}

export function Loader({
    label,
    centered = true,
    size = 'md',
    color,
    ...props
}: LoaderComponentProps) {
    const loader = <MantineLoader size={size} color={color} {...props} />;

    if (label) {
        const content = (
            <Stack gap="xs" align="center">
                {loader}
                <Text size="sm" c="dimmed">
                    {label}
                </Text>
            </Stack>
        );

        return centered ? <Center h={"100%"}>{content}</Center> : content;
    }

    return centered ? <Center h={"100%"}>{loader}</Center> : loader;
}
