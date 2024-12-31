import {QueryKey, useQuery, UseQueryOptions} from '@tanstack/react-query';
import {apiGet} from "@/lib/api";

// Tipe untuk opsi tambahan pada hook
interface FetchDataOptions<T, U = T> extends Omit<UseQueryOptions<T, unknown, U, QueryKey>, 'queryFn' | 'queryKey'> {
    params?: Record<string, unknown>; // Parameter untuk query
    transformData?: (data: T) => U; // Fungsi untuk mentransformasi data sebelum dikembalikan
}

/**
 * Custom hook untuk melakukan fetch data menggunakan React Query
 * @param key - Key untuk cache query
 * @param url - Endpoint API yang akan dipanggil
 * @param options - Opsi tambahan seperti params, enabled, onSuccess, onError, dan transformData
 */
export const useFetchData = <T, U = T>(
    key: string,
    url: string,
    options?: FetchDataOptions<T, U>,
) => {
    const { params = {}, transformData, ...queryOptions } = options || {};

    return useQuery<T, unknown, U>(
        {
            queryKey: [key], // Query key
            queryFn: async () => {
                return await apiGet<T>(url, params);
            },
            select: transformData, // Transform data jika diperlukan
            ...queryOptions, // Menggabungkan opsi lainnya seperti onSuccess, onError, enabled, dll.
        }
    );
};
