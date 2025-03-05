import {Quiz} from "../components/ui/Quiz.tsx";

interface QuizData {
    name: string;
    description: string;
}

const quizzes: QuizData[] = [
    {name: "Quiz 1", description: "lorem ipsum dolorem"},
    {name: "Quiz 2", description: "lorem ipsum dolorem"},
    {name: "Quiz 3", description: "lorem ipsum dolorem"},
    {name: "Quiz 4", description: "lorem ipsum dolorem"},
    {name: "Quiz 5", description: "lorem ipsum dolorem"},
    {name: "Quiz 6", description: "lorem ipsum dolorem"},
];

export const Quizzes: React.FC = () => {
    return (
        <div>
            <div className="px-10 py-25 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {quizzes.map((quiz, index) => (
                    <Quiz
                        key={index}
                        name={quiz.name}
                        description={quiz.description}
                        onClick={() => {}}
                    />
                ))}
            </div>
        </div>
    )
}