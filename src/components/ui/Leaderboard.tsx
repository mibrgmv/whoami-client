import React from "react";
import { User } from "../../shared/types";
import dayjs from "dayjs";

interface LeaderboardProps {
  users: User[];
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ users }) => {
  const thClass =
    "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider";
  const tdBase = "px-6 py-4 whitespace-nowrap text-sm";
  const tdClasses = {
    username: `${tdBase} text-gray-700`,
    date: `${tdBase} text-gray-500`,
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">User List</h2>
        <p className="text-sm text-gray-500 mt-1">
          Total users shown: {users.length}
        </p>
      </div>

      {/* Desktop */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className={thClass}>Username</th>
              <th className={thClass}>Created At</th>
              <th className={thClass}>Last Login</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.userId} className="hover:bg-gray-50">
                  <td className={tdClasses.username}>{user.username}</td>
                  <td className={tdClasses.date}>
                    {dayjs(user.createdAt).format("YYYY-MM-DD HH:mm:ss")}
                  </td>
                  <td className={tdClasses.date}>
                    {dayjs(user.lastLogin).format("YYYY-MM-DD HH:mm:ss")}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={3}
                  className="px-6 py-4 text-center text-sm text-gray-500"
                >
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile */}
      <div className="md:hidden">
        {users.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {users.map((user) => (
              <div key={user.userId} className="p-4 hover:bg-gray-50">
                <div className="grid grid-cols-2 gap-4 mt-3">
                  <div>
                    <div className="text-xs font-medium text-gray-500 uppercase mb-1">
                      Username
                    </div>
                    <div className="text-sm text-gray-700">{user.username}</div>
                  </div>

                  <div>
                    <div className="text-xs font-medium text-gray-500 uppercase mb-1">
                      Created At
                    </div>
                    <div className="text-sm text-gray-500">
                      {dayjs(user.createdAt).format("YYYY-MM-DD HH:mm:ss")}
                    </div>
                  </div>

                  <div className="col-span-2">
                    <div className="text-xs font-medium text-gray-500 uppercase mb-1">
                      Last Login
                    </div>
                    <div className="text-sm text-gray-500">
                      {dayjs(user.lastLogin).format("YYYY-MM-DD HH:mm:ss")}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="px-6 py-4 text-center text-sm text-gray-500">
            No users found
          </div>
        )}
      </div>
    </div>
  );
};
