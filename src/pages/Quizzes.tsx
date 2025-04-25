import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "../components/Container.tsx";
import { LoadingSpinner } from "../components/ui/LoadingSpinner.tsx";
import { ErrorMessage } from "../components/ui/ErrorMessage.tsx";
import { Card } from "../components/ui/Card.tsx";
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

    if (loading) {
        return (
            <Container>
                <LoadingSpinner />
            </Container>
        );
    }

    if (error) {
        return (
            <Container>
                <ErrorMessage message={error} />
            </Container>
        );
    }

    return (
        <Container>
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-6">
                    <h1 className="text-2xl font-semibold text-gray-800 mb-6">Available Quizzes</h1>

                    {quizzes.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-gray-500">No quizzes available</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {quizzes.map((quiz, index) => (
                                <Card
                                    key={quiz.id || index}
                                    name={quiz.title}
                                    buttonText="Start Quiz"
                                    onClick={() => handleQuizClick(quiz.id)}
                                />
                            ))}
                        </div>
                    )}

                    {nextPageToken && (
                        <div className="mt-8 pt-4 border-t border-gray-200 flex justify-center">
                            <button
                                onClick={handleLoadMore}
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                                disabled={isLoadingMore}
                            >
                                {isLoadingMore ? <LoadingSpinner /> : 'Load More Quizzes'}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </Container>
    );
};