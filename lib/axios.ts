import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import {ApiResponse} from "@/lib/types/apiResponse";
import {getCookie} from "cookies-next";

// Buat instance Axios
const apiClient: AxiosInstance = axios.create({
    baseURL: 'http://localhost:3000/api', // URL dasar dari environment
    timeout: 10000, // Timeout request dalam 10 detik
    headers: {
        'Content-Type': 'application/json', // Header default
    },
});

// Interceptor untuk menambahkan token ke request
apiClient.interceptors.request.use(
    async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
        try {
            const token = await getCookie('access_token');

            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        } catch (error: unknown) {
            console.error('Error fetching token from storage:', error);
        }
        return config;
    },
    (error: unknown): Promise<never> => {
        console.error('Request error:', error);
        return Promise.reject(error);
    }
);

// Interceptor untuk penanganan response
apiClient.interceptors.response.use(
    (response: AxiosResponse): AxiosResponse => {
        return response;
    },
    async (error: { response?: AxiosResponse<ApiResponse<null>> }): Promise<never> => {
        const status = error.response?.status;
        const errorResponse = error.response?.data;

        if (status === 401) {
            console.error('Unauthorized! Redirecting to login...');
            if (typeof window !== 'undefined') {
                window.location.href = '/login';
            }
        } else if (status === 403) {
            console.error('Forbidden! Access is denied.');
        } else if (status === 500) {
            console.error('Server error! Please try again later.');
        } else if (errorResponse) {
            console.error(`Error ${status}: ${errorResponse.message}`);
        } else {
            console.error('Unhandled error:', error);
        }

        return Promise.reject(error);
    }
);

export default apiClient;
