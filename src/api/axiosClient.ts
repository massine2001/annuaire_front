import axios from 'axios';
import { getToken } from '../utils/storage';

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8082/api',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: Number(import.meta.env.VITE_API_TIMEOUT) || 10000,
})

axiosClient.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            const currentPath = window.location.pathname;
            if (!currentPath.includes('/login') && !currentPath.includes('/register')) {
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export default axiosClient;