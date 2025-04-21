import {Endpoints} from "../endpoints.ts";

interface LoginRequest {
    username: string,
    password: string
}

interface LoginResponse {
    token: string,
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
        // todo check what comes out on internal error
        const data = await response.json();
        const errorMessage = data?.message || `failed to register`;
        throw new Error(errorMessage);
    }
    const data: LoginResponse = await response.json();
    return data;
}