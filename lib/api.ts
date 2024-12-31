import apiClient from "@/lib/axios";
import {ApiResponse} from "@/lib/types/apiResponse";

// Fungsi helper untuk melakukan request GET
export const apiGet = async <T>(url: string, params?: Record<string, unknown>): Promise<T> => {
    try {
        const response = await apiClient.get<ApiResponse<T>>(url, { params });
        if (response.data.statusCode === 200) {
            return response.data.data as T;
        }
        throw new Error(response.data.message);
    } catch (error: unknown) {
        console.error('GET request error:', error);
        throw error;
    }
};

// Fungsi helper untuk melakukan request POST
export const apiPost = async <T>(url: string, data?: Record<string, unknown>): Promise<T> => {
    try {
        const response = await apiClient.post<ApiResponse<T>>(url, data);
        if (response.data.statusCode === 200) {
            return response.data.data as T;
        }
        throw new Error(response.data.message);
    } catch (error: unknown) {
        console.error('POST request error:', error);
        throw error;
    }
};

// Fungsi helper untuk melakukan request PUT
export const apiPut = async <T>(url: string, data?: Record<string, unknown>): Promise<T> => {
    try {
        const response = await apiClient.put<ApiResponse<T>>(url, data);
        if (response.data.statusCode === 200) {
            return response.data.data as T;
        }
        throw new Error(response.data.message);
    } catch (error: unknown) {
        console.error('PUT request error:', error);
        throw error;
    }
};

// Fungsi helper untuk melakukan request DELETE
export const apiDelete = async <T>(url: string): Promise<T> => {
    try {
        const response = await apiClient.delete<ApiResponse<T>>(url);
        if (response.data.statusCode === 200) {
            return response.data.data as T;
        }
        throw new Error(response.data.message);
    } catch (error: unknown) {
        console.error('DELETE request error:', error);
        throw error;
    }
};