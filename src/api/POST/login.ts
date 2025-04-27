import {Endpoints} from "../endpoints.ts";

interface LoginRequest {
    username: string,
    password: string
}

interface LoginResponse {
    accessToken: string,
    refreshToken: string,
    userId: string
}

export const login = async ({username, password}: LoginRequest) => {
    const response = await fetch(Endpoints.login, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({username, password}),
    });

    if (!response.ok) {
        const data = await response.json();
        const errorMessage = data?.message || `Failed to login`;
        throw new Error(errorMessage);
    }

    const data: LoginResponse = await response.json();
    return {
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        userId: data.userId
    };
}