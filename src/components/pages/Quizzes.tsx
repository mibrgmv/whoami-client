import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getQuizzes, GetQuizzesResponse } from "../../api";
import { Quiz } from "../../shared/types";
import { GeneralError, LoadingSpinner } from "../ui";

export const Quizzes: React.FC = () => {
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [nextPageToken, setNextPageToken] = useState<string>("");
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const pageSize = 8;

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        if (isLoadingMore) {
          const response: GetQuizzesResponse = await getQuizzes(
            pageSize,
            nextPageToken,
          );
          setQuizzes((prevQuizzes) => [...prevQuizzes, ...response.quizzes]);
          setNextPageToken(response.nextPageToken);
          setIsLoadingMore(false);
        } else {
          const response: GetQuizzesResponse = await getQuizzes(pageSize, "");
          setQuizzes(response.quizzes);
          setNextPageToken(response.nextPageToken);
          setLoading(false);
        }
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Failed to load quizzes.");
        }
        setLoading(false);
        setIsLoadingMore(false);
      }
    };

    if (loading || isLoadingMore) {
      fetchQuizzes();
    }
  }, [loading, isLoadingMore, nextPageToken]);

  const handleQuizClick = (quizId: string) => {
    navigate(`/quizzes/${quizId}`);
  };

  const handleLoadMore = () => {
    if (nextPageToken) {
      setIsLoadingMore(true);
    }
  };

  const handleCreateClick = () => {
    navigate("/quizzes/create");
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
          {/* Desktop */}
          <div className="hidden md:block bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  Available Quizzes
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Total quizzes shown: {quizzes.length}
                </p>
              </div>
              <button
                onClick={handleCreateClick}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                Create Quiz
              </button>
            </div>

            <div className="p-6">
              {quizzes.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {quizzes.map((quiz, index) => (
                    <div
                      key={quiz.id || index}
                      className="border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-200 overflow-hidden cursor-pointer"
                      onClick={() => handleQuizClick(quiz.id)}
                    >
                      <div className="h-24 bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
                        <span className="text-2xl font-bold text-white opacity-80">
                          Quiz
                        </span>
                      </div>
                      <div className="p-4 flex items-center justify-between">
                        {" "}
                        <div>
                          <h3 className="font-medium text-gray-900">
                            {quiz.title}
                          </h3>
                        </div>
                        <div className="text-blue-600">
                          {" "}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500">No quizzes found</p>
                </div>
              )}
            </div>

            {nextPageToken && (
              <button
                onClick={handleLoadMore}
                className="w-full py-4 border-t border-gray-200 flex justify-center px-4 text-gray-700 rounded hover:cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                disabled={isLoadingMore}
              >
                {isLoadingMore ? <LoadingSpinner /> : "Load More"}
              </button>
            )}
          </div>

          {/* Mobile */}
          <div className="md:hidden">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Available Quizzes
              </h2>
              <button
                onClick={handleCreateClick}
                className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                Create
              </button>
            </div>

            {quizzes.length > 0 ? (
              <div className="divide-y divide-gray-200">
                {quizzes.map((quiz, index) => (
                  <div
                    key={quiz.id || index}
                    className="p-4 hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleQuizClick(quiz.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs font-medium text-gray-500 uppercase mb-1">
                          Quiz Title
                        </div>
                        <div className="text-sm font-medium text-gray-900">
                          {quiz.title}
                        </div>
                      </div>
                      <div className="text-blue-600">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="px-6 py-4 text-center text-sm text-gray-500">
                No quizzes found
              </div>
            )}

            {nextPageToken && (
              <div className="pt-4 border-t border-gray-200 flex justify-center">
                <button
                  onClick={handleLoadMore}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                  disabled={isLoadingMore}
                >
                  {isLoadingMore ? <LoadingSpinner /> : "Load More Quizzes"}
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};
