import { useEffect, useState, useCallback } from "react";
import { useAuth } from "../../AuthContext.tsx";
import { QuizHistoryItem } from "../../shared/types";
import { useGetQuizHistory } from "../../hooks";
import { GeneralError, LoadingSpinner, QuizHistoryList } from "../ui";

export const HistoryPage = () => {
  const { isAuthenticated, authTokens } = useAuth();
  const [historyItems, setHistoryItems] = useState<QuizHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [nextPageToken, setNextPageToken] = useState<string>("");
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const pageSize = 10;
  const [error, setError] = useState<string | null>(null);
  const { getQuizHistory } = useGetQuizHistory();

  const fetchHistory = useCallback(
    async (loadMore = false) => {
      if (!isAuthenticated || !authTokens.userId) {
        setLoading(false);
        setError("Not logged in");
        return;
      }

      try {
        const userIds = authTokens.userId ? [authTokens.userId] : null;

        const response = await getQuizHistory(
          userIds,
          null,
          pageSize,
          loadMore ? nextPageToken : "",
        );

        setHistoryItems((prevItems) =>
          loadMore ? [...prevItems, ...response.items] : response.items,
        );
        setNextPageToken(response.nextPageToken || "");
        setLoading(false);
        setError(null);
        setIsLoadingMore(false);
      } catch (err: any) {
        console.error("Error fetching quiz history:", err);
        setError(err.message || "Failed to load quiz history.");
        setLoading(false);
        setIsLoadingMore(false);
      }
    },
    [
      isAuthenticated,
      getQuizHistory,
      nextPageToken,
      pageSize,
      authTokens.userId,
    ],
  );

  useEffect(() => {
    if (loading && isAuthenticated && authTokens.userId) {
      fetchHistory(false);
    } else if (!isAuthenticated) {
      setLoading(false);
      setError("Not logged in");
    }
  }, [loading, fetchHistory, isAuthenticated, authTokens.userId]);

  useEffect(() => {
    if (isLoadingMore) {
      fetchHistory(true);
    }
  }, [isLoadingMore, fetchHistory]);

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
          {historyItems.length === 0 ? (
            <div className="text-center text-gray-600 py-8">
              You haven't completed any quizzes yet.
            </div>
          ) : (
            <QuizHistoryList historyItems={historyItems} />
          )}

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
                  "Load More History"
                )}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};
