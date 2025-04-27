import {useEffect, useState} from 'react';
import {useAuth} from '../AuthContext.tsx';
import {Container} from "../components/Container.tsx";
import {LoadingSpinner} from "../components/ui/LoadingSpinner.tsx";
import {ErrorMessage} from "../components/ui/ErrorMessage.tsx";
import {User} from "../shared/types/User.tsx";
import {getCurrentUser} from "../api/GET/getCurrentUser.ts";
import {deleteUser} from "../api/DELETE/deleteUser.ts";
import {updateUser} from "../api/PUT/updateUser.ts";
import {FadeOverlay} from "../components/ui/navbar/FadeOverlay.tsx";

export const ProfilePage = () => {
    const {authTokens, removeAuthTokens, getAccessToken} = useAuth();
    const [profile, setProfile] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteError, setDeleteError] = useState<string | null>(null);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const [showEditForm, setShowEditForm] = useState(false);
    const [editUsername, setEditUsername] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isUpdating, setIsUpdating] = useState(false);
    const [updateError, setUpdateError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const accessToken = await getAccessToken();
                if (!accessToken) {
                    setLoading(false);
                    setError('No token available');
                    return;
                }
                const profileData = await getCurrentUser(accessToken);
                setProfile(profileData);
                setEditUsername(profileData.username);
                setLoading(false);
            } catch (err: any) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchProfile();
    }, [getAccessToken]);

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
        setIsDeleting(true);
        setDeleteError(null);

        try {
            const token = await getAccessToken();
            if (!token || !authTokens) {
                setDeleteError('Not authenticated');
                return;
            }

            await deleteUser(authTokens);
            removeAuthTokens();
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

    const handleOpenEditForm = () => {
        if (profile) {
            setEditUsername(profile.username);
        }
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setUpdateError(null);
        setShowEditForm(true);
    };

    const handleCloseEditForm = () => {
        setShowEditForm(false);
    };

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsUpdating(true);
        setUpdateError(null);

        if (!currentPassword) {
            setUpdateError('Current password is required');
            setIsUpdating(false);
            return;
        }

        if (newPassword && newPassword !== confirmPassword) {
            setUpdateError('New passwords do not match');
            setIsUpdating(false);
            return;
        }

        try {
            if (!authTokens) {
                setUpdateError('Not authenticated');
                return;
            }

            const updateData = {
                username: profile?.username !== editUsername ? editUsername : undefined,
                currentPassword,
                newPassword: newPassword || undefined
            };

            const updatedUser = await updateUser(authTokens, updateData);
            setProfile(updatedUser);
            setShowEditForm(false);
        } catch (err: any) {
            setUpdateError(err.message);
        } finally {
            setIsUpdating(false);
        }
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
                            <div className="flex gap-4">
                                <button
                                    onClick={handleOpenEditForm}
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                                >
                                    Edit Profile
                                </button>
                                <button
                                    onClick={handleOpenConfirmation}
                                    className={`px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors ${isDeleting ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    disabled={isDeleting}
                                >
                                    {isDeleting ? <LoadingSpinner/> : 'Delete Profile'}
                                </button>
                            </div>

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

                            {showEditForm && (
                                <>
                                    <FadeOverlay isVisible={showEditForm} onClick={handleCloseEditForm}/>
                                    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50">
                                        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
                                            <h2 className="text-lg font-semibold text-gray-800 mb-4">Edit Profile</h2>

                                            <form onSubmit={handleUpdateProfile}>
                                                <div className="mb-4">
                                                    <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                                                        Username
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="username"
                                                        value={editUsername}
                                                        onChange={(e) => setEditUsername(e.target.value)}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    />
                                                </div>

                                                <div className="mb-4">
                                                    <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                                        Current Password (required)
                                                    </label>
                                                    <input
                                                        type="password"
                                                        id="currentPassword"
                                                        value={currentPassword}
                                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                        required
                                                    />
                                                </div>

                                                <div className="mb-4">
                                                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                                        New Password (optional)
                                                    </label>
                                                    <input
                                                        type="password"
                                                        id="newPassword"
                                                        value={newPassword}
                                                        onChange={(e) => setNewPassword(e.target.value)}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    />
                                                </div>

                                                <div className="mb-4">
                                                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                                        Confirm New Password
                                                    </label>
                                                    <input
                                                        type="password"
                                                        id="confirmPassword"
                                                        value={confirmPassword}
                                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                                        className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 ${
                                                            newPassword && newPassword !== confirmPassword
                                                                ? 'border-red-500 focus:ring-red-500'
                                                                : 'focus:ring-blue-500'
                                                        }`}
                                                        disabled={!newPassword}
                                                    />
                                                    {newPassword && newPassword !== confirmPassword && (
                                                        <p className="mt-1 text-sm text-red-500">Passwords do not match</p>
                                                    )}
                                                </div>

                                                {updateError && (
                                                    <div className="mb-4 text-sm text-red-500">{updateError}</div>
                                                )}

                                                <div className="flex justify-end gap-4">
                                                    <button
                                                        type="button"
                                                        onClick={handleCloseEditForm}
                                                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        type="submit"
                                                        className={`px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors ${
                                                            isUpdating ? 'opacity-50 cursor-not-allowed' : ''
                                                        }`}
                                                        disabled={isUpdating || (newPassword !== '' && newPassword !== confirmPassword)}
                                                    >
                                                        {isUpdating ? <LoadingSpinner /> : 'Save Changes'}
                                                    </button>
                                                </div>
                                            </form>
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