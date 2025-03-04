import {useEffect, useState} from 'react';
import {useAuth} from '../AuthContext.tsx';

interface ProfileData {
    username: string;
    createdAt: string;
    lastLogin: string;
}

export const Profile = () => {
    const {token} = useAuth();
    const [profile, setProfile] = useState<ProfileData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            if (!token) {
                setLoading(false);
                setError('No token available');
                return;
            }
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/users/profile`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
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
    }, [token]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="content">
            {profile && (
                <div>
                    <p><strong>Username:</strong> {profile.username}</p>
                    <p><strong>Created At:</strong> {new Date(profile.createdAt).toLocaleString()}</p>
                    <p><strong>Last Login:</strong> {new Date(profile.lastLogin).toLocaleString()}</p>
                </div>
            )}
        </div>
    );
};
