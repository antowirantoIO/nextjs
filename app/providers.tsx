"use client";

import React from 'react';
import {
    QueryCache,
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query';
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

const globalQueryErrorHandler = (error: unknown) => {
    console.error('React Query Error:', error);

    if (error instanceof Error) {
        console.error(`Something went wrong: ${error.message}`);
    }
};

function makeQueryClient() {
    return new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 60 * 1000, // Data tetap fresh selama 1 menit
                refetchOnWindowFocus: false, // Tidak refetch otomatis saat kembali ke tab
                retry: 2, // Retry hingga 2 kali jika fetch gagal
                refetchOnReconnect: true, // Refetch jika koneksi terputus lalu tersambung
            },
            mutations: {
                retry: 1, // Retry 1 kali jika mutasi gagal
            },
        },
        queryCache: new QueryCache({
            onError: globalQueryErrorHandler, // Error handler global untuk query
        }),
    });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
    if (typeof window === 'undefined') {
        console.log('Server QueryClient created');
        return makeQueryClient();
    } else {
        console.log('Browser QueryClient created');
        if (!browserQueryClient) browserQueryClient = makeQueryClient();
        return browserQueryClient;
    }
}

export default function Providers({ children }: { children: React.ReactNode }) {
    const queryClient = getQueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools position="bottom" initialIsOpen={false} />
            {children}
        </QueryClientProvider>
    );
}
