import axios from 'axios';

let accessTokenGetter: (() => string | null) | null = null;

export function setAccessTokenGetter(getter: () => string | null) {
    accessTokenGetter = getter;
}

const axiosInstance = axios.create({
    baseURL: process.env.API_URL || 'http://localhost:4000',
    withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
    const token = accessTokenGetter?.();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default axiosInstance;