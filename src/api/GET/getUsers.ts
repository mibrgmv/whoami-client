import {User} from "../../shared/types/User.tsx";
import {Endpoints} from "../endpoints.ts";
import {LoginData} from "../../AuthContext.tsx";

export interface GetUsersResponse {
    users: User[];
    nextPageToken: string;
}

export const getUsers = async ({token}: LoginData) => {
    const response = await fetch(Endpoints.users, {
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