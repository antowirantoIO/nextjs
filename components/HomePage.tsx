'use client';

import { useFetchData } from '@/hooks/useFetchData';

type User = {
    id: number;
    name: string;
    email: string;
};

const HomePage = () => {
    const { data: users, isLoading, isError } = useFetchData<User[]>('users', '/users');

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error fetching users</p>;

    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
                <ul className="grid gap-4">
                    {users?.map((user) => (
                        <li key={user.id} className="grid gap-2">
                            <h3 className="text-lg font-semibold">{user.name}</h3>
                            <p className="text-sm text-gray-500">{user.email}</p>
                        </li>
                    ))}
                </ul>
            </main>
        </div>
    );
};

export default HomePage;
