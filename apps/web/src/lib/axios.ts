import axios from 'axios';
const axiosInstance = axios.create({
    baseURL: process.env.API_URL || 'http://localhost:4000',
    withCredentials: true,
});

export default axiosInstance;