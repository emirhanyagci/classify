"use client"
import { useUser } from "@/contexts/UserContext";
import { login } from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useRouter } from "next/navigation";

export function useLogin() {
    const router = useRouter();
    const { setUser, setLoading } = useUser();
    const loginHandler = (email: string, password: string) => {
        setLoading(true);
        return login(email, password)
    }
    return useMutation<AxiosResponse<{ accessToken?: string }>, unknown, { email: string; password: string }>({
        mutationFn: ({ email, password }) => login(email, password),
        onSuccess: (data) => {
            console.log(data);
            const token = data.data.accessToken;
            if (token) {

                localStorage.setItem('access_token', token);
                setUser((prev) => ({ ...(prev ?? {}), access_token: token }));
                router.push("/dashboard")
            }
            setLoading(false);
        },
        onError: (error) => {
            console.log(error);
            setLoading(false)
        },

    });
}