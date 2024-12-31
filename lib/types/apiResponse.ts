export interface ApiResponse<T> {
    statusCode: number;
    message: string;
    _metadata: {
        language: string;
        timestamp: number;
        timezone: string;
        path: string;
        version: string;
        repoVersion: string;
        pagination: {
            search: string;
            filters: Record<string, unknown>;
            page: number;
            perPage: number;
            orderBy: string;
            orderDirection: string;
            availableSearch: string[];
            availableOrderBy: string[];
            availableOrderDirection: string[];
            total: number;
            totalPage: number;
        };
    };
    data: T;
}