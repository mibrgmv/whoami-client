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

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    };

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
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    {/*<div className="px-6 py-4 border-b border-gray-200">*/}
                    {/*    <h2 className="text-xl font-semibold text-gray-800">User Profile</h2>*/}
                    {/*</div>*/}

                    <div className="p-6">
                        <div className="mb-6">
                            <div className="text-sm font-medium text-gray-500 uppercase mb-1">ID</div>
                            <div className="text-md font-medium text-gray-900 break-all">{profile.userId}</div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <div className="text-sm font-medium text-gray-500 uppercase mb-1">Username</div>
                                <div className="text-lg text-gray-800">{profile.username}</div>
                            </div>

                  {/*          <div>*/}
                  {/*              <div className="text-sm font-medium text-gray-500 uppercase mb-1">Account Status</div>*/}
                  {/*              <div className="text-lg">*/}
                  {/*<span className="px-2 py-1 text-sm font-medium bg-green-100 text-green-800 rounded-full">*/}
                  {/*  Active*/}
                  {/*</span>*/}
                  {/*              </div>*/}
                  {/*          </div>*/}

                            <div>
                                <div className="text-sm font-medium text-gray-500 uppercase mb-1">Created On</div>
                                <div className="text-md text-gray-700">{formatDate(profile.createdAt)}</div>
                            </div>

                            <div>
                                <div className="text-sm font-medium text-gray-500 uppercase mb-1">Last Login</div>
                                <div className="text-md text-gray-700">{formatDate(profile.lastLogin)}</div>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-gray-200">
                            <button
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
                                Edit Profile
                            </button>
                            <button
                                className="ml-4 px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
                                Change Password
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </Container>
    );
};