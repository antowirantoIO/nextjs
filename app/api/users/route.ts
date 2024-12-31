import { NextResponse } from 'next/server';
import {ApiResponse} from "@/lib/types/apiResponse";

// Fake data untuk respons
const fakeUsers = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Michael Johnson', email: 'michael@example.com' },
];

// Handler untuk GET request
export async function GET() {
    const response: ApiResponse<typeof fakeUsers> = {
        statusCode: 200,
        message: 'Data retrieved successfully',
        _metadata: {
            language: 'en',
            timestamp: Date.now(),
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            path: '/api/fake-data',
            version: '1.0.0',
            repoVersion: 'v1.2.3',
            pagination: {
                search: '',
                filters: {},
                page: 1,
                perPage: 10,
                orderBy: 'id',
                orderDirection: 'asc',
                availableSearch: ['name', 'email'],
                availableOrderBy: ['id', 'name'],
                availableOrderDirection: ['asc', 'desc'],
                total: fakeUsers.length,
                totalPage: 1,
            },
        },
        data: fakeUsers,
    };

    return NextResponse.json(response);
}
