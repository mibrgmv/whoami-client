import {Card} from "../components/ui/Card.tsx";
import {useNavigate} from "react-router-dom";

interface QuizData {
    id: bigint;
    name: string;
    description: string;
}

const quizzes: QuizData[] = [
    {id: 1n, name: "Quiz 1", description: "lorem ipsum dolorem"},
    {id: 2n, name: "Quiz 2", description: "lorem ipsum dolorem"},
    {id: 3n, name: "Quiz 3", description: "lorem ipsum dolorem"},
    {id: 4n, name: "Quiz 4", description: "lorem ipsum dolorem"},
    {id: 5n, name: "Quiz 5", description: "lorem ipsum dolorem"},
    {id: 6n, name: "Quiz 6", description: "lorem ipsum dolorem"},
];

export const Quizzes: React.FC = () => {
    const navigate = useNavigate();

    const handleQuizClick = (quizId: number) => {
        navigate(`/quiz/${quizId}`);
    };

    return (
        <div>
            <div className="px-10 py-25 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {quizzes.map((quiz, index) => (
                    <Card
                        key={index}
                        name={quiz.name}
                        description={quiz.description}
                        buttonText="Start Quiz"
                        onClick={() => handleQuizClick(index)}
                    />
                ))}
            </div>
        </div>
    )
}