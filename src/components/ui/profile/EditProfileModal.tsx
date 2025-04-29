import {useState} from "react";
import {FadeOverlay} from "../navbar/FadeOverlay.tsx";
import {LoadingSpinner} from "../LoadingSpinner.tsx";

interface EditProfileModalProps {
    isVisible: boolean;
    initialUsername: string;
    onClose: () => void;
    onSave: (username: string, currentPassword: string, newPassword: string) => Promise<void>;
    isUpdating: boolean;
    updateError: string | null;
}

export const EditProfileModal = ({
                                     isVisible,
                                     initialUsername,
                                     onClose,
                                     onSave,
                                     isUpdating,
                                     updateError
                                 }: EditProfileModalProps) => {
    const [editUsername, setEditUsername] = useState(initialUsername);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!currentPassword) {
            return; // Form validation will catch this
        }

        if (newPassword && newPassword !== confirmPassword) {
            return; // Form validation will catch this
        }

        await onSave(editUsername, currentPassword, newPassword);
    };

    const passwordsMatch = !newPassword || newPassword === confirmPassword;

    return (
        <>
            {isVisible && (
                <>
                    <FadeOverlay isVisible={isVisible} onClick={onClose}/>
                    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50">
                        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">Edit Profile</h2>

                            <form onSubmit={handleSubmit}>
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
                                    <label htmlFor="currentPassword"
                                           className="block text-sm font-medium text-gray-700 mb-1">
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
                                    <label htmlFor="newPassword"
                                           className="block text-sm font-medium text-gray-700 mb-1">
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
                                    <label htmlFor="confirmPassword"
                                           className="block text-sm font-medium text-gray-700 mb-1">
                                        Confirm New Password
                                    </label>
                                    <input
                                        type="password"
                                        id="confirmPassword"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 ${
                                            newPassword && !passwordsMatch
                                                ? 'border-red-500 focus:ring-red-500'
                                                : 'focus:ring-blue-500'
                                        }`}
                                        disabled={!newPassword}
                                    />
                                    {newPassword && !passwordsMatch && (
                                        <p className="mt-1 text-sm text-red-500">Passwords do not match</p>
                                    )}
                                </div>

                                {updateError && (
                                    <div className="mb-4 text-sm text-red-500">{updateError}</div>
                                )}

                                <div className="flex justify-end gap-4">
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className={`px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors ${
                                            isUpdating ? 'opacity-50 cursor-not-allowed' : ''
                                        }`}
                                        disabled={isUpdating || (newPassword !== '' && !passwordsMatch)}
                                    >
                                        {isUpdating ? <LoadingSpinner/> : 'Save Changes'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};