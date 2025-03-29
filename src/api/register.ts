import {Endpoints} from "./endpoints.ts";
import {useNavigate} from "react-router-dom";
import {User} from "../shared/types/User.tsx";

type RegisterRequest = { username: string, password: string }

export const register = async ({username, password}: RegisterRequest) => {
    const navigate = useNavigate();

    const response = await fetch(Endpoints.register, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username, password}),
    });

    if (response.ok) {
        navigate('/login');
    }
    const data: User = await response.json();
    return data;
}
