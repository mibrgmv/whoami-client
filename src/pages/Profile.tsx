import {useEffect, useState} from 'react';
import {useAuth} from '../AuthContext.tsx';
import {Container} from "../components/Container.tsx";
import {LoadingSpinner} from "../components/ui/LoadingSpinner.tsx";
import {ErrorMessage} from "../components/ui/ErrorMessage.tsx";
import {User} from "../shared/types/User.tsx";
import {getCurrentUser} from "../api/GET/getCurrentUser.ts";
import {deleteUser} from "../api/DELETE/deleteUser.ts";
import {FadeOverlay} from "../components/ui/navbar/FadeOverlay.tsx";

export const ProfilePage = () => {
    const {loginData, removeLoginData} = useAuth();
    const [profile, setProfile] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteError, setDeleteError] = useState<string | null>(null);
    const [showConfirmation, setShowConfirmation] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            if (!loginData?.token) {
                setLoading(false);
                setError('No token available');
                return;
            }
            try {
                const profileData = await getCurrentUser(loginData.token);
                setProfile(profileData);
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

    const handleDeleteProfile = async () => {
        if (!loginData?.token) {
            setDeleteError('Not authenticated');
            return;
        }

        setIsDeleting(true);
        setDeleteError(null);

        try {
            await deleteUser(loginData);
            removeLoginData();
            window.location.replace('/login');
        } catch (err: any) {
            setDeleteError(err.message);
        } finally {
            setIsDeleting(false);
        }
    };

    const handleOpenConfirmation = () => {
        setShowConfirmation(true);
    };

    const handleCloseConfirmation = () => {
        setShowConfirmation(false);
    };

    const handleConfirmDelete = () => {
        handleDeleteProfile();
        handleCloseConfirmation();
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

                            <div>
                                <div className="text-sm font-medium text-gray-500 uppercase mb-1">Created At</div>
                                <div className="text-md text-gray-700">{formatDate(profile.createdAt)}</div>
                            </div>

                            <div>
                                <div className="text-sm font-medium text-gray-500 uppercase mb-1">Last Login</div>
                                <div className="text-md text-gray-700">{formatDate(profile.lastLogin)}</div>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-gray-200 relative">
                            <button
                                onClick={handleOpenConfirmation}
                                className={`px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors ${isDeleting ? 'opacity-50 cursor-not-allowed' : ''}`}
                                disabled={isDeleting}
                            >
                                {isDeleting ? <LoadingSpinner/> : 'Delete Profile'}
                            </button>
                            {deleteError && (
                                <div className="mt-2 text-sm text-red-500">{deleteError}</div>
                            )}

                            {showConfirmation && (
                                <>
                                    <FadeOverlay isVisible={showConfirmation} onClick={handleCloseConfirmation}/>
                                    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50">
                                        <div className="bg-white rounded-lg shadow-lg p-6">
                                            <h2 className="text-lg font-semibold text-gray-800 mb-4">Delete profile</h2>
                                            <p className="text-gray-700 mb-4">Are you sure you want to delete your profile? This action cannot be undone.</p>
                                            <div className="flex justify-end gap-4">
                                                <button onClick={handleCloseConfirmation} className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
                                                    Cancel
                                                </button>
                                                <button
                                                    onClick={handleConfirmDelete}
                                                    className={`px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors ${isDeleting ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                    disabled={isDeleting}
                                                >
                                                    {isDeleting ? <LoadingSpinner/> : 'Delete'}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </Container>
    );
};