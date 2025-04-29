import {FadeOverlay} from "../navbar/FadeOverlay.tsx";
import {LoadingSpinner} from "../LoadingSpinner.tsx";

interface DeleteConfirmationModalProps {
    isVisible: boolean;
    onClose: () => void;
    onConfirm: () => void;
    isDeleting: boolean;
    deleteError: string | null;
}

export const DeleteConfirmationModal = ({
                                            isVisible,
                                            onClose,
                                            onConfirm,
                                            isDeleting,
                                            deleteError
                                        }: DeleteConfirmationModalProps) => {
    return (
        <>
            {isVisible && (
                <>
                    <FadeOverlay isVisible={isVisible} onClick={onClose}/>
                    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50">
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">Delete profile</h2>
                            <p className="text-gray-700 mb-4">
                                Are you sure you want to delete your profile? This action cannot be undone.
                            </p>

                            {deleteError && (
                                <div className="mb-4 text-sm text-red-500">{deleteError}</div>
                            )}

                            <div className="flex justify-end gap-4">
                                <button
                                    onClick={onClose}
                                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={onConfirm}
                                    className={`px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors ${
                                        isDeleting ? 'opacity-50 cursor-not-allowed' : ''
                                    }`}
                                    disabled={isDeleting}
                                >
                                    {isDeleting ? <LoadingSpinner/> : 'Delete'}
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};