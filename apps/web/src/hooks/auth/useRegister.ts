"use client";
import { register } from "@/services/auth.service";
import { useState } from "react";

export function useRegister() {
    const [error, setError] = useState<Error | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const registerMutation = async (
        name: string,
        email: string,
        password: string
    ) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await register(name, email, password);
            console.log(response);
            return response;
        } catch (err) {
            const error = err instanceof Error ? err : new Error("Registration failed");
            setError(error);
            console.error(error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    return {
        register: registerMutation,
        isLoading,
        error,
    };
}
