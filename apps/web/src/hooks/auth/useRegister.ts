import { register } from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

export function useRegister() {
    return useMutation<AxiosResponse, unknown, { name: string; email: string; password: string }>({
        mutationFn: ({ name, email, password }) => register(name, email, password),
        onSuccess: (data) => {
            console.log(data);
        },
        onError: (error) => {
            console.log(error);
        },
    });
}