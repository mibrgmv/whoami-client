import {useEffect, useState} from 'react';
import {useAuth} from '../AuthContext.tsx';
import {Leaderboard} from "../components/ui/Leaderboard.tsx";
import {Container} from "../components/Container.tsx";
import {LoadingSpinner} from "../components/ui/LoadingSpinner.tsx";
import {ErrorMessage} from "../components/ui/ErrorMessage.tsx";
import {User} from "../shared/types/User.tsx";
import {getUsers} from "../api/GET/getUsers.ts";

export const Users = () => {
    const {loginData} = useAuth();
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            if (!loginData) {
                setLoading(false);
                setError('Not logged in');
                return;
            }
            try {
                const response = await getUsers(loginData)
                setUsers(response.users);
                setLoading(false);
            } catch (err: any) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchUsers();
    }, [loginData]);

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
