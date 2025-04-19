import React, {useState, useEffect} from "react";
import {Card} from "../components/ui/Card.tsx";
import {useNavigate} from "react-router-dom";
import {Container} from "../components/Container.tsx";
import {LoadingSpinner} from "../components/ui/LoadingSpinner.tsx";
import {ErrorMessage} from "../components/ui/ErrorMessage.tsx";
import {Quiz} from "../shared/types/Quiz.tsx";
import {getQuizzes, GetQuizzesResponse} from "../api/GET/quizzes.ts";

export const Quizzes: React.FC = () => {
    const navigate = useNavigate();
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [nextPageToken, setNextPageToken] = useState<string>("");
    const pageSize = 4;

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const response: GetQuizzesResponse = await getQuizzes(pageSize, nextPageToken);
                setQuizzes(response.quizzes);
                setNextPageToken(response.nextPageToken);
            } catch (err: any) {
                setError(err.message);
                setLoading(false);
            } finally {
                setLoading(false);
            }
        };

        fetchQuizzes();
    }, [nextPageToken]);

    const handleQuizClick = (quizId: string) => {
        navigate(`/quizzes/${quizId}`);
    };

    if (loading) {
        return (
            <Container>
                <LoadingSpinner/>
            </Container>
        );
    }

    if (error) {
        return (
            <Container>
                <ErrorMessage message={error}/>
            </Container>
        );
    }

    return (
        <div>
            <div className="px-10 py-25 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {quizzes.map((quiz, index) => (
                    <Card
                        key={index}
                        name={quiz.title}
                        buttonText="Start Quiz"
                        onClick={() => handleQuizClick(quiz.id)}
                    />
                ))}
            </div>
            {nextPageToken && (
                <button onClick={() => setNextPageToken(nextPageToken)}>Load More</button>
            )}
        </div>
    );
};