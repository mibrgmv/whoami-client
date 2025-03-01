import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext.tsx';

const Profile = () => {
    const { token } = useAuth();
    const [profile, setProfile] = useState<any>(null);
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
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/profile`, {
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
            <h2>Profile</h2>
            {profile && (
                <pre>{JSON.stringify(profile, null, 2)}</pre>
            )}
        </div>
    );
};

export default Profile;