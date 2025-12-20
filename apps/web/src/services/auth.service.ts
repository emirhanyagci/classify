import axiosInstance from "@/lib/axios";

export function login(email: string, password: string) {
    return axiosInstance.post('/auth/login', {
        email,
        password,
    });
}

export function register(name: string, email: string, password: string) {
    return axiosInstance.post('/auth/register', {
        name,
        email,
        password,
    });
}