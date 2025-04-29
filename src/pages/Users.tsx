import {useEffect, useState} from 'react';
import {useAuth} from '../AuthContext.tsx';
import {Leaderboard} from "../components/ui/Leaderboard.tsx";
import {LoadingSpinner} from "../components/ui/LoadingSpinner.tsx";
import {ErrorMessage} from "../components/ui/ErrorMessage.tsx";
import {User} from "../shared/types/User.tsx";
import {useGetUsers} from "../api/GET/getUsers.ts";

export const Users = () => {
    const {authTokens, getAccessToken} = useAuth();
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [nextPageToken, setNextPageToken] = useState<string>("");
    const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
    const pageSize = 10;
    const [error, setError] = useState<string | null>(null);
    const {getUsers} = useGetUsers();

    useEffect(() => {
        const fetchUsers = async () => {
            if (!authTokens) {
                setLoading(false);
                setError('Not logged in');
                return;
            }

            try {
                const token = await getAccessToken();
                if (!token) {
                    setLoading(false);
                    setError('No token available');
                    return;
                }

                if (isLoadingMore) {
                    const response = await getUsers(pageSize, nextPageToken);
                    setUsers(prevUsers => [...prevUsers, ...response.users]);
                    setNextPageToken(response.nextPageToken);
                    setIsLoadingMore(false);
                } else {
                    const response = await getUsers(pageSize, "");
                    setUsers(response.users);
                    setNextPageToken(response.nextPageToken);
                    setLoading(false);
                }
            } catch (err: any) {
                setError(err.message);
                setLoading(false);
                setIsLoadingMore(false);
            }
        };

        if (loading || isLoadingMore) {
            fetchUsers();
        }
    }, [loading, isLoadingMore, nextPageToken, authTokens, getAccessToken]);

    const handleLoadMore = () => {
        if (nextPageToken) {
            setIsLoadingMore(true);
        }
    };

    return (
        <div className="min-h-screen pt-20 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto overflow-y-auto">
            {loading ? (
                <div className="flex justify-center">
                    <LoadingSpinner/>
                </div>
            ) : error ? (
                <div className="mt-8">
                    <ErrorMessage message={error}/>
                </div>
            ) : (
                <>
                    <Leaderboard users={users}/>

                    {nextPageToken && (
                        <div className="mt-6 pt-4 border-t border-gray-200 flex justify-center">
                            <button
                                onClick={handleLoadMore}
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                                disabled={isLoadingMore}
                            >
                                {isLoadingMore ? <LoadingSpinner/> : 'Load More Users'}
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};