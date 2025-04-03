import {useEffect, useState} from 'react';
import {useAuth} from '../AuthContext.tsx';
import {Container} from "../components/Container.tsx";
import {LoadingSpinner} from "../components/ui/LoadingSpinner.tsx";
import {ErrorMessage} from "../components/ui/ErrorMessage.tsx";
import {User} from "../shared/types/User.tsx";

export const ProfilePage = () => {
    const {loginData} = useAuth();
    const [profile, setProfile] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            if (!loginData) {
                setLoading(false);
                setError('No token available');
                return;
            }
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/users/current`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${loginData.token}`,
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch profile');
                }
                const data = await response.json();
                setProfile(data);
                setLoading(false);
            } catch (err: any) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchProfile();
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
            {profile && (
                <div>
                    <p><strong>Username:</strong> {profile.username}</p>
                    <p><strong>Created At:</strong> {new Date(profile.createdAt).toLocaleString()}</p>
                    <p><strong>Last Login:</strong> {new Date(profile.lastLogin).toLocaleString()}</p>
                </div>
            )}
        </Container>
    );
};
