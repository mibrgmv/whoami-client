import {User} from "../../shared/types/User.tsx";
import {Endpoints} from "../endpoints.ts";
import {LoginResponse} from "../POST/login.ts";

export interface GetUsersResponse {
    users: User[];
    nextPageToken: string;
}

export const getUsers = async (loginData: LoginResponse) => {
    const response = await fetch(Endpoints.getUsers, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${loginData.token}`,
        },
    });
    if (!response.ok) {
        throw new Error('Failed to fetch users');
    }
    const data: GetUsersResponse = await response.json();
    return data;
}