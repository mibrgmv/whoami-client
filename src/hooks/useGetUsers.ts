import { useCallback } from 'react';
import { fetchUsers as fetchUsersApi, GetUsersResponse } from '../api/GET/getUsers.ts';
import { useApiClient } from './useApiClient';

export const useGetUsers = () => {
    const { fetch } = useApiClient();

    const getUsers = useCallback(
        async (pageSize: number, pageToken: string): Promise<GetUsersResponse> => {
            return fetchUsersApi(pageSize, pageToken, fetch);
        },
        [fetch]
    );

    return { getUsers };
};