"use client";
import { AuthenticationForm } from "@classify/ui";
import { useLogin } from "@/hooks/auth/useLogin";
import { useRegister } from "@/hooks/auth/useRegister";

export default function Login() {
  const { login } = useLogin();
  const { register } = useRegister();

  const handleLogin = async (payload: { email: string; password: string }) => {
    return await login(payload.email, payload.password);
  };

  const handleRegister = async (payload: {
    name: string;
    email: string;
    password: string;
  }) => {
    return await register(payload.name, payload.email, payload.password);
  };

  return <AuthenticationForm onLogin={handleLogin} onRegister={handleRegister} />;
}
