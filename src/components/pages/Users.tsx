import { useEffect, useState, useCallback } from "react";
import { User } from "../../shared/types";
import { useAuth, useGetUsers } from "../../hooks";
import { GeneralError, Leaderboard, LoadingSpinner } from "../ui";

export const Users = () => {
  const { isAuthenticated } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [nextPageToken, setNextPageToken] = useState<string>("");
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const pageSize = 10;
  const [error, setError] = useState<string | null>(null);
  const { getUsers } = useGetUsers();

  const fetchUsers = useCallback(
    async (loadMore = false) => {
      if (!isAuthenticated) {
        setLoading(false);
        setError("Not logged in");
        return;
      }

      try {
        const response = await getUsers(
          pageSize,
          loadMore ? nextPageToken : "",
        );
        setUsers((prevUsers) =>
          loadMore ? [...prevUsers, ...response.users] : response.users,
        );
        setNextPageToken(response.nextPageToken || "");
        setLoading(false);
        setError(null);
        setIsLoadingMore(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Failed to load users.");
        }
        setLoading(false);
        setIsLoadingMore(false);
      }
    },
    [isAuthenticated, getUsers, nextPageToken, pageSize],
  );

  useEffect(() => {
    if (loading && isAuthenticated) {
      fetchUsers(false);
    } else if (!isAuthenticated) {
      setLoading(false);
      setError("Not logged in");
    }
  }, [loading, fetchUsers, isAuthenticated]);

  useEffect(() => {
    if (isLoadingMore) {
      fetchUsers(true);
    }
  }, [isLoadingMore, fetchUsers]);

  const handleLoadMore = () => {
    if (nextPageToken && !isLoadingMore) {
      setIsLoadingMore(true);
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto overflow-y-auto">
      {loading ? (
        <div className="flex justify-center">
          <LoadingSpinner />
        </div>
      ) : error ? (
        <div className="mt-8">
          <GeneralError message={error} />
        </div>
      ) : (
        <>
          <Leaderboard users={users} />

          {nextPageToken && (
            <div className="mt-6 pt-4 border-t border-gray-200 flex justify-center">
              <button
                onClick={handleLoadMore}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                disabled={isLoadingMore}
              >
                {isLoadingMore ? (
                  <LoadingSpinner size="small" />
                ) : (
                  "Load More Users"
                )}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};
