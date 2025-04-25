import {User} from "../../shared/types/User.tsx";
import {Endpoints} from "../endpoints.ts";
import {LoginData} from "../../AuthContext.tsx";

export interface GetUsersResponse {
    users: User[];
    nextPageToken: string;
}

export const getUsers = async (pageSize: number, pageToken: string, {token}: LoginData) => {
    let url = `${Endpoints.users}?page_size=${pageSize}`;
    if (pageToken) {
        url += `&page_token=${pageToken}`;
    }

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (!response.ok) {
        throw new Error('Failed to fetch users');
    }
    const data: GetUsersResponse = await response.json();
    return data;
}