import {useState, useEffect} from "react";
import {Card} from "../components/ui/Card.tsx";
import {useNavigate} from "react-router-dom";

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
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/quiz`, {
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

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

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