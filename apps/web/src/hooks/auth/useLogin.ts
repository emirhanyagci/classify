"use client";
import { useUser } from "@/contexts/UserContext";
import { login } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function useLogin() {
    const router = useRouter();
    const { setUser, setLoading } = useUser();
    const [error, setError] = useState<Error | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const loginMutation = async (email: string, password: string) => {
        setIsLoading(true);
        setLoading(true);
        setError(null);

        try {
            const response = await login(email, password);
            const { accessToken, ...userData } = response.data;

            if (accessToken) {
                setUser({ ...userData, accessToken });
                router.push("/dashboard");
            }

            return response;
        } catch (err) {
            const error = err instanceof Error ? err : new Error("Login failed");
            setError(error);
            console.error(error);
            throw error;
        } finally {
            setIsLoading(false);
            setLoading(false);
        }
    };

    return {
        login: loginMutation,
        isLoading,
        error,
    };
}
