import {User} from "../../shared/types/User.tsx";
import {Endpoints} from "../endpoints.ts";

export interface GetUsersResponse {
    users: User[];
    nextPageToken: string;
}

export const fetchUsers = async (
    pageSize: number,
    pageToken: string,
    fetchFunction: (url: string, options: RequestInit) => Promise<Response>
): Promise<GetUsersResponse> => {
    let url = `${Endpoints.users}?page_size=${pageSize}`;
    if (pageToken) {
        url += `&page_token=${pageToken}`;
    }

    const response = await fetchFunction(url, {
        method: 'GET',
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch users: ${response.status} ${response.statusText}`);
    }

    return await response.json();
};
