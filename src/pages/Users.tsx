import {useEffect, useState} from 'react';
import {useAuth} from '../AuthContext.tsx';
import {Leaderboard} from "../components/ui/Leaderboard.tsx";
import {LoadingSpinner} from "../components/ui/LoadingSpinner.tsx";
import {ErrorMessage} from "../components/ui/ErrorMessage.tsx";
import {User} from "../shared/types/User.tsx";
import {getUsers, GetUsersResponse} from "../api/GET/getUsers.ts";

export const Users = () => {
    const {loginData} = useAuth();
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [nextPageToken, setNextPageToken] = useState<string>("");
    const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
    const pageSize = 10;
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            if (!loginData) {
                setLoading(false);
                setError('Not logged in');
                return;
            }

            try {
                if (isLoadingMore) {
                    const response: GetUsersResponse = await getUsers(pageSize, nextPageToken, loginData);
                    setUsers(prevUsers => [...prevUsers, ...response.users]);
                    setNextPageToken(response.nextPageToken);
                    setIsLoadingMore(false);
                } else {
                    const response: GetUsersResponse = await getUsers(pageSize, "", loginData);
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
    }, [loading, isLoadingMore, nextPageToken, loginData]);

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