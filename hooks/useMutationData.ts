import { useMutation, UseMutationOptions, QueryClient } from '@tanstack/react-query';
import { apiPost, apiPut, apiDelete } from '@/lib/api';

// Define supported HTTP methods
type HttpMethod = 'POST' | 'PUT' | 'DELETE';

// Map HTTP methods to their corresponding API functions
const apiMethods = {
    POST: apiPost,
    PUT: apiPut,
    DELETE: apiDelete,
};

// Type for additional options in the hook
interface MutationDataOptions<TData, TVariables extends Record<string, unknown> | undefined>
    extends Omit<UseMutationOptions<TData, unknown, TVariables, unknown>, 'mutationFn'> {
    queryClient?: QueryClient; // Optional QueryClient for cache management
}

// Generic mutation hook
export const useMutationData = <TData, TVariables extends Record<string, unknown> | undefined>(
    method: HttpMethod,
    url: string,
    options?: MutationDataOptions<TData, TVariables>
) => {
    const { queryClient, ...mutationOptions } = options || {};

    // Retrieve the appropriate API function based on the method
    const apiFunction = apiMethods[method];

    // Define the mutation function
    const mutationFn = async (variables: TVariables) => {
        switch (method) {
            case 'POST':
            case 'PUT':
                return await apiFunction<TData>(url, variables);
            case 'DELETE':
                return await apiFunction<TData>(url);
            default:
                throw new Error(`Unsupported method: ${method}`);
        }
    };

    return useMutation<TData, unknown, TVariables, unknown>(
        {
            mutationFn,
            ...mutationOptions,
            onSuccess: (data, variables, context) => {
                // Invalidate all queries or specify particular ones
                queryClient?.invalidateQueries();
                // Call any additional onSuccess handler provided in options
                mutationOptions?.onSuccess?.(data, variables, context);
            },
        }
    );
};
