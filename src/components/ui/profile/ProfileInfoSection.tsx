import { User } from "../../../shared/types/User.tsx";
import dayjs from "dayjs";

interface ProfileInfoSectionProps {
  profile: User;
  onEditClick: () => void;
  onDeleteClick: () => void;
}

export const ProfileInfoSection = ({
  profile,
  onEditClick,
  onDeleteClick,
}: ProfileInfoSectionProps) => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-6">
        <div className="mb-6">
          <div className="text-sm font-medium text-gray-500 uppercase mb-1">
            ID
          </div>
          <div className="text-md font-medium text-gray-900 break-all">
            {profile.userId}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <div className="text-sm font-medium text-gray-500 uppercase mb-1">
              Username
            </div>
            <div className="text-lg text-gray-800">{profile.username}</div>
          </div>

          <div>
            <div className="text-sm font-medium text-gray-500 uppercase mb-1">
              Created At
            </div>
            <div className="text-md text-gray-700">
              {dayjs(profile.createdAt).format("YYYY-MM-DD HH:mm:ss")}
            </div>
          </div>

          <div>
            <div className="text-sm font-medium text-gray-500 uppercase mb-1">
              Last Login
            </div>
            <div className="text-md text-gray-700">
              {dayjs(profile.lastLogin).format("YYYY-MM-DD HH:mm:ss")}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 relative">
          <div className="flex gap-4">
            <button
              onClick={onEditClick}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Edit Profile
            </button>
            <button
              onClick={onDeleteClick}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
            >
              Delete Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
