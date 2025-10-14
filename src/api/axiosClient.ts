import axios from 'axios';

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: Number(import.meta.env.VITE_API_TIMEOUT) || 10000,
    withCredentials: true, 
})


axiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            const currentPath = window.location.pathname;
            const publicRoutes = ['/', '/login', '/register', '/join', '/pool'];
            const isPublicRoute = publicRoutes.some(route => 
                currentPath === route || currentPath.startsWith(route + '/')
            );
            
            const isAuthCheck = error.config?.url?.includes('/auth/me');
            
            if (!isPublicRoute && !isAuthCheck) {
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export default axiosClient;