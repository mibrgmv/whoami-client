import React from 'react';
import { User } from "../../shared/types/User.tsx";

interface LeaderboardProps {
    users: User[];
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ users }) => {
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

    const thClass = "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider";
    const tdBase = "px-6 py-4 whitespace-nowrap text-sm";
    const tdClasses = {
        id: `${tdBase} font-medium text-gray-900`,
        username: `${tdBase} text-gray-700`,
        date: `${tdBase} text-gray-500`
    };

    return (
        <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800">User List</h2>
                <p className="text-sm text-gray-500 mt-1">Total users: {users.length}</p>
            </div>

            {/* Desktop view - traditional table */}
            <div className="hidden md:block overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                    <tr>
                        <th className={thClass}>ID</th>
                        <th className={thClass}>Username</th>
                        <th className={thClass}>Created At</th>
                        <th className={thClass}>Last Login</th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {users.length > 0 ? (
                        users.map((user) => (
                            <tr key={user.userId} className="hover:bg-gray-50">
                                <td className={tdClasses.id}>{user.userId}</td>
                                <td className={tdClasses.username}>{user.username}</td>
                                <td className={tdClasses.date}>{formatDate(user.createdAt)}</td>
                                <td className={tdClasses.date}>{formatDate(user.lastLogin)}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">No users found</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>

            {/* Mobile view - card based layout */}
            <div className="md:hidden">
                {users.length > 0 ? (
                    <div className="divide-y divide-gray-200">
                        {users.map((user) => (
                            <div key={user.userId} className="p-4 hover:bg-gray-50">
                                <div className="flex justify-between py-1">
                                    <span className="text-xs font-medium text-gray-500 uppercase">ID</span>
                                    <span className="text-sm font-medium text-gray-900">{user.userId}</span>
                                </div>
                                <div className="flex justify-between py-1">
                                    <span className="text-xs font-medium text-gray-500 uppercase">Username</span>
                                    <span className="text-sm text-gray-700">{user.username}</span>
                                </div>
                                <div className="flex justify-between py-1">
                                    <span className="text-xs font-medium text-gray-500 uppercase">Created</span>
                                    <span className="text-sm text-gray-500">{formatDate(user.createdAt)}</span>
                                </div>
                                <div className="flex justify-between py-1">
                                    <span className="text-xs font-medium text-gray-500 uppercase">Last Login</span>
                                    <span className="text-sm text-gray-500">{formatDate(user.lastLogin)}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="px-6 py-4 text-center text-sm text-gray-500">No users found</div>
                )}
            </div>
        </div>
    );
};