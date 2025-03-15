import {useEffect, useState} from 'react';
import {useAuth} from '../AuthContext.tsx';
import {Leaderboard} from "../components/ui/Leaderboard.tsx";
import {Container} from "../components/Container.tsx";
import {LoadingSpinner} from "../components/ui/LoadingSpinner.tsx";
import {ErrorMessage} from "../components/ui/ErrorMessage.tsx";

interface User {
    userId: number;
    username: string;
    lastLogin: string;
}

export const Users = () => {
    const {token} = useAuth();
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            if (!token) {
                setLoading(false);
                setError('No token available');
                return;
            }
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/users`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch users');
                }
                const data = await response.json();
                setUsers(data);
                setLoading(false);
            } catch (err: any) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchUsers();
    }, [token]);

    if (loading) {
        return (
            <Container>
                <LoadingSpinner/>
            </Container>
        );
    }

    if (error) {
        return (
            <Container>
                <ErrorMessage message={error}/>
            </Container>
        );
    }

    return (
        <Container>
            <Leaderboard users={users}/>
        </Container>
    );
};
