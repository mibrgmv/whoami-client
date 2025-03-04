import React from 'react';

interface User {
    userId: number;
    username: string;
    lastLogin: string;
}

interface LeaderboardProps {
    users: User[];
}

export const Leaderboard: React.FC<LeaderboardProps> = ({users}) => {
    return (
        <div>
            <div className="grid grid-cols-3 gap-4">
                <div className="font-bold">Rank</div>
                <div className="font-bold">Username</div>
                <div className="font-bold">Last Login</div>

                {users.map((user, index) => (
                    <div key={user.userId}>
                        <div>{index + 1}</div>
                        <div>{user.username}</div>
                        <div>{new Date(user.lastLogin).toLocaleString()}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};
