import {Endpoints} from "../endpoints.ts";
import {User} from "../../shared/types/User.tsx";

type RegisterRequest = { username: string, password: string }

export const register = async ({username, password}: RegisterRequest) => {
    const response = await fetch(Endpoints.register, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, password}),
    });
    if (!response.ok) {
        const data = await response.json();
        const errorMessage = data?.message || `failed to register`;
        throw new Error(errorMessage);
    }
    const data: User = await response.json();
    return data;
}
