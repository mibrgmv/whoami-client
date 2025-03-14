import React, {useState, useEffect} from "react";
import {Card} from "../components/ui/Card.tsx";
import {useNavigate} from "react-router-dom";
import {Container} from "../components/Container.tsx";
import {LoadingSpinner} from "../components/ui/LoadingSpinner.tsx";
import {ErrorMessage} from "../components/ui/ErrorMessage.tsx";

interface QuizData {
    id: bigint;
    title: string;
}

export const Quizzes: React.FC = () => {
    const navigate = useNavigate();
    const [quizzes, setQuizzes] = useState<QuizData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/quiz/q`, {
                    method: 'GET',
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch');
                }
                const data = await response.json();
                setQuizzes(data);
                setLoading(false);
            } catch (err: any) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchQuizzes();
    }, []);

    const handleQuizClick = (quizId: bigint) => {
        navigate(`/quiz/${quizId}`);
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
        </div>
    )
}