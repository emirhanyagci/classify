"use client"
import { AuthenticationForm } from "@classify/ui";
import { useLogin } from "@/hooks/auth/useLogin";
import { useRegister } from "@/hooks/auth/useRegister";

export default function Login() {
    const { mutateAsync: login } = useLogin();
    const { mutateAsync: register } = useRegister();

    return (
        <AuthenticationForm onLogin={login} onRegister={register} />
    );
}
