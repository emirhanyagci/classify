
import {
    Anchor,
    Button,
    Checkbox,
    Divider,
    Group,
    Paper,
    PaperProps,
    PasswordInput,
    Stack,
    Text,
    TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { upperFirst, useToggle } from '@mantine/hooks';
import { GoogleButton } from '../icons/GoogleButton';
import { AxiosResponse } from 'axios';
import styled from 'styled-components';
const Container = styled.div`
        max-width: 90%;
        width: 500px;
        margin: 0 auto;
        margin-top: 100px;
`;

interface AuthenticationFormProps extends PaperProps {
    onLogin: (payload: { email: string; password: string }) => Promise<AxiosResponse>;
    onRegister: (payload: { name: string; email: string; password: string }) => Promise<AxiosResponse>;
}

export function AuthenticationForm({ onLogin, onRegister, ...props }: AuthenticationFormProps) {
    const [type, toggle] = useToggle(['login', 'register']);
    const form = useForm({
        initialValues: {
            email: '',
            name: '',
            password: '',
            terms: true,
        },

        validate: {
            email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
            password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
        },
    });
    async function onSubmitHandler(values: typeof form.values) {
        if (type === 'login') {
            const res = await onLogin({ email: values.email, password: values.password });


        } else {
            const res = await onRegister({ name: values.name, email: values.email, password: values.password });
            if (res.status === 201) {
                toggle("login")
            }

        }
    }
    return (
        <Container>
            <Paper radius="md" p="lg" withBorder {...props}>
                <Text size="lg" fw={500}>
                    Welcome to Mantine, {type} with
                </Text>

                <Group grow mb="md" mt="md">
                    <GoogleButton radius="xl">Google</GoogleButton>
                </Group>

                <Divider label="Or continue with email" labelPosition="center" my="lg" />

                <form onSubmit={form.onSubmit(onSubmitHandler)}>
                    <Stack>
                        {type === 'register' && (
                            <TextInput
                                label="Name"
                                placeholder="Your name"
                                radius="md"
                                {...form.getInputProps('name')}
                            />
                        )}

                        <TextInput
                            required
                            label="Email"
                            placeholder="hello@mantine.dev"
                            radius="md"
                            {...form.getInputProps('email')}
                        />

                        <PasswordInput
                            required
                            label="Password"
                            placeholder="Your password"
                            radius="md"
                            {...form.getInputProps('password')}
                        />

                        {type === 'register' && (
                            <Checkbox
                                label="I accept terms and conditions"
                                {...form.getInputProps('terms', { type: 'checkbox' })}
                            />
                        )}
                    </Stack>

                    <Group justify="space-between" mt="xl">
                        <Anchor component="button" type="button" c="dimmed" onClick={() => toggle()} size="xs">
                            {type === 'register'
                                ? 'Already have an account? Login'
                                : "Don't have an account? Register"}
                        </Anchor>
                        <Button type="submit" radius="xl">
                            {upperFirst(type)}
                        </Button>
                    </Group>
                </form>
            </Paper>
        </Container>
    );
}