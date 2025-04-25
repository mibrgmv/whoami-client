import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoadingSpinner } from "../components/ui/LoadingSpinner.tsx";
import { ErrorMessage } from "../components/ui/ErrorMessage.tsx";
import { Quiz } from "../shared/types/Quiz.tsx";
import { getQuizzes, GetQuizzesResponse } from "../api/GET/getQuizzes.ts";

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
                    const response: GetQuizzesResponse = await getQuizzes(pageSize, nextPageToken);
                    setQuizzes(prevQuizzes => [...prevQuizzes, ...response.quizzes]);
                    setNextPageToken(response.nextPageToken);
                    setIsLoadingMore(false);
                } else {
                    const response: GetQuizzesResponse = await getQuizzes(pageSize, "");
                    setQuizzes(response.quizzes);
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

    const thClass = "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider";
    const tdBase = "px-6 py-4 whitespace-nowrap text-sm";
    const tdClasses = {
        title: `${tdBase} font-medium text-gray-900`,
        action: `${tdBase} text-right`
    };

    return (
        <div className="min-h-screen pt-20 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto overflow-y-auto">
            {loading ? (
                <div className="flex justify-center">
                    <LoadingSpinner />
                </div>
            ) : error ? (
                <div className="mt-8">
                    <ErrorMessage message={error} />
                </div>
            ) : (
                <>
                    <div className="bg-white rounded-lg shadow bg-red-300 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h2 className="text-xl font-semibold text-gray-800">Available Quizzes</h2>
                            <p className="text-sm text-gray-500 mt-1">Total quizzes shown: {quizzes.length}</p>
                        </div>

                        {/* Desktop */}
                        <div className="hidden md:block overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                <tr>
                                    <th className={thClass}>Quiz Title</th>
                                    <th className={`${thClass} text-right`}>Action</th>
                                </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                {quizzes.length > 0 ? (
                                    quizzes.map((quiz, index) => (
                                        <tr key={quiz.id || index} className="hover:bg-gray-50">
                                            <td className={tdClasses.title}>{quiz.title}</td>
                                            <td className={tdClasses.action}>
                                                <button
                                                    onClick={() => handleQuizClick(quiz.id)}
                                                    className="px-4 py-2 bg-blue-600 text-white text-s rounded cursor-pointer hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                                                >
                                                    Start
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={2} className="px-6 py-4 text-center text-sm text-gray-500">No quizzes found</td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile */}
                        <div className="md:hidden">
                            {quizzes.length > 0 ? (
                                <div className="divide-y divide-gray-200">
                                    {quizzes.map((quiz, index) => (
                                        <div key={quiz.id || index} className="p-4 hover:bg-gray-50">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <div className="text-xs font-medium text-gray-500 uppercase mb-1">Quiz Title</div>
                                                    <div className="text-sm font-medium text-gray-900">{quiz.title}</div>
                                                </div>
                                                <div className="mt-2">
                                                    <button
                                                        onClick={() => handleQuizClick(quiz.id)}
                                                        className="px-4 py-2 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                                                    >
                                                        Start Quiz
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="px-6 py-4 text-center text-sm text-gray-500">No quizzes found</div>
                            )}
                        </div>
                    </div>

                    {nextPageToken && (
                        <div className="mt-8 pt-4 border-t border-gray-200 flex justify-center">
                            <button
                                onClick={handleLoadMore}
                                className="px-4 py-2 bg-blue-600 cursor-pointer text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                                disabled={isLoadingMore}
                            >
                                {isLoadingMore ? <LoadingSpinner /> : 'Load More Quizzes'}
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};