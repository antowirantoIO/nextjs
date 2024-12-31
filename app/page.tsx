import { Suspense } from 'react';
import { HydrationBoundary, dehydrate, QueryClient } from '@tanstack/react-query';
import HomePage from '@/components/HomePage';
import {apiGet} from "@/lib/api";

type User = {
    id: number;
    name: string;
    email: string;
};

const createQueryClient = (): QueryClient => new QueryClient();

const Page = async () => {
    const queryClient = createQueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['users'],
        queryFn: async () => {
            return await apiGet<User[]>('users');
        },
    });

    const dehydratedState = dehydrate(queryClient);

    return (
        <Suspense fallback={<p>Loading...</p>}>
            <HydrationBoundary state={dehydratedState}>
                <HomePage />
            </HydrationBoundary>
        </Suspense>
    );
};

export default Page;
