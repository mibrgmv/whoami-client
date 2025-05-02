import { useEffect, useState } from "react";
import { useAuth } from "../../AuthContext.tsx";
import { User } from "../../shared/types";
import {
  DeleteConfirmationModal,
  EditProfileModal,
  GeneralError,
  LoadingSpinner,
  ProfileInfoSection,
} from "../ui";
import { Container } from "../Container.tsx";
import { useDeleteUser, useGetCurrentUser, useUpdateUser } from "../../hooks";

export const ProfilePage = () => {
  const { logout, isAuthenticated } = useAuth();
  const { getCurrentUser } = useGetCurrentUser();
  const { deleteCurrentUser } = useDeleteUser();
  const { updateCurrentUser } = useUpdateUser();

  const [profile, setProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const [showEditForm, setShowEditForm] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!isAuthenticated) {
        setLoading(false);
        setError("Not authenticated");
        return;
      }

      try {
        const profileData = await getCurrentUser();
        setProfile(profileData);
        setLoading(false);
        setError(null);
      } catch (err: any) {
        console.error("Error fetching profile:", err);
        setError(err.message || "Failed to load profile.");
        setLoading(false);
      }
    };

    fetchProfile();
  }, [getCurrentUser, isAuthenticated]);

  const handleDeleteProfile = async () => {
    setIsDeleting(true);
    setDeleteError(null);

    try {
      if (!isAuthenticated) {
        setDeleteError("Not authenticated");
        return;
      }

      await deleteCurrentUser();
      logout();
      window.location.replace("/login");
    } catch (err: any) {
      console.error("Error deleting profile:", err);
      setDeleteError(err.message || "Failed to delete profile.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleOpenConfirmation = () => setShowConfirmation(true);
  const handleCloseConfirmation = () => setShowConfirmation(false);
  const handleConfirmDelete = () => {
    handleDeleteProfile();
    handleCloseConfirmation();
  };

  const handleOpenEditForm = () => setShowEditForm(true);
  const handleCloseEditForm = () => setShowEditForm(false);

  const handleUpdateProfile = async (
    username: string,
    currentPassword: string,
    newPassword: string,
  ) => {
    setIsUpdating(true);
    setUpdateError(null);

    try {
      if (!isAuthenticated) {
        setUpdateError("Not authenticated");
        return;
      }

      const updateData = {
        username: profile?.username !== username ? username : undefined,
        currentPassword,
        newPassword: newPassword || undefined,
      };

      const updatedUser = await updateCurrentUser(updateData);
      setProfile(updatedUser);
      setShowEditForm(false);
      setUpdateError(null);
    } catch (err: any) {
      console.error("Error updating profile:", err);
      setUpdateError(err.message || "Failed to update profile.");
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) {
    return (
      <Container>
        <LoadingSpinner />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <GeneralError message={error} />
      </Container>
    );
  }

  return (
    <Container>
      {profile && (
        <>
          <ProfileInfoSection
            profile={profile}
            onEditClick={handleOpenEditForm}
            onDeleteClick={handleOpenConfirmation}
          />

          <EditProfileModal
            isVisible={showEditForm}
            initialUsername={profile.username}
            onClose={handleCloseEditForm}
            onSave={handleUpdateProfile}
            isUpdating={isUpdating}
            updateError={updateError}
          />

          <DeleteConfirmationModal
            isVisible={showConfirmation}
            onClose={handleCloseConfirmation}
            onConfirm={handleConfirmDelete}
            isDeleting={isDeleting}
            deleteError={deleteError}
          />
        </>
      )}
    </Container>
  );
};
