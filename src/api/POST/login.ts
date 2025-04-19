import {Endpoints} from "../endpoints.ts";

export type LoginRequest = { username: string, password: string }
export type LoginResponse = { token: string, user_id: number }

export const login = async ({username, password}: LoginRequest) => {
    const response = await fetch(Endpoints.login, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({username, password}),
    });
    if (!response.ok) {
        throw new Error('Failed to login');
    }
    const data: LoginResponse = await response.json();
    return data;
}