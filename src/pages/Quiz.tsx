import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from "../components/Container.tsx";

interface Question {
    id: bigint;
    quiz_id: bigint;
    body: string;
    options: string[];
}

interface Quiz {
    id: bigint;
    title: string;
}

export const Quiz: React.FC = () => {
    const {id} = useParams();
    const [quiz, setQuiz] = useState<Quiz | null>(null);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchQuizAndQuestions = async () => {
            try {
                const quizResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL}/quiz/${id}`);
                if (!quizResponse.ok) {
                    throw new Error('Failed to fetch quiz');
                }
                const quizData: Quiz = await quizResponse.json();
                setQuiz(quizData);

                const questionsResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL}/quiz/${id}/questions`);
                if (!questionsResponse.ok) {
                    if (questionsResponse.status === 404) {
                        setQuestions([]);
                    } else {
                        throw new Error('Failed to fetch questions');
                    }
                } else {
                    const questionsData: Question[] = await questionsResponse.json();
                    setQuestions(questionsData);
                }
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchQuizAndQuestions();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    if (!quiz) {
        return <div>Quiz not found</div>;
    }

    if (!questions || questions.length === 0) {
        return <div>No questions found.</div>;
    }

    return (
        <Container>
            <h1>{quiz.title}</h1>
            {questions.map((question, index) => (
                <div key={index}>
                    <p>{question.body}</p>
                    <ul>
                        {question.options.map((option, optionIndex) => (
                            <li key={optionIndex}>{option}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </Container>
    );
};