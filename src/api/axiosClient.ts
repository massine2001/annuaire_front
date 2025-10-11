import axios from 'axios';

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8082/api',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: Number(import.meta.env.VITE_API_TIMEOUT) || 10000,
})

export default axiosClient;