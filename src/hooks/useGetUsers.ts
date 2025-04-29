import {useCallback} from 'react';
import {fetchUsers as fetchUsersApi, GetUsersResponse} from '../api/GET/getUsers.ts';
import {useAuth} from '../AuthContext';

export const useGetUsers = () => {
    const {getAccessToken, refreshAccessToken} = useAuth();

    const getUsers = useCallback(
        async (pageSize: number, pageToken: string): Promise<GetUsersResponse> => {
            const accessToken = await getAccessToken();
            if (!accessToken) {
                throw new Error('No access token available');
            }

            const authorizedFetch = async (url: string, options: RequestInit): Promise<Response> => {
                const response = await fetch(url, {
                    ...options,
                    headers: {
                        ...options?.headers,
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                if (response.status === 401) {
                    const refreshed = await refreshAccessToken();
                    if (refreshed) {
                        const newAccessToken = await getAccessToken();
                        if (newAccessToken) {
                            return fetch(url, {
                                ...options,
                                headers: {
                                    ...options?.headers,
                                    Authorization: `Bearer ${newAccessToken}`,
                                },
                            });
                        } else {
                            throw new Error('Failed to get new access token after refresh');
                        }
                    } else {
                        throw new Error('Unauthorized and failed to refresh token');
                    }
                }

                return response;
            };

            return fetchUsersApi(pageSize, pageToken, authorizedFetch);
        },
        [getAccessToken, refreshAccessToken]
    );

    return {getUsers};
};