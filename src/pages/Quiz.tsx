import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {Container} from "../components/Container.tsx";

interface Question {
    text: string;
    options: string[];
    answer: string[];
}

interface QuizData {
    id: number;
    name: string;
    questions: Question[];
}

export const Quiz: React.FC = () => {
    const {id} = useParams();
    const [quiz, setQuiz] = useState<QuizData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/quizzes/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch quiz');
                }
                const data = await response.json();
                setQuiz(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchQuiz();
        }
    }, [id]);

    if (loading) {
        return <div>Loading quiz...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!quiz) {
        return <div>Quiz not found</div>;
    }

    return (
        <Container>
            <h1>{quiz.name}</h1>
            {quiz.questions.map((question, index) => (
                <div key={index}>
                    <p>{question.text}</p>
                </div>
            ))}
        </Container>
    );
};