import React, {useEffect, useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {Container} from "../components/Container.tsx";
import {LoadingSpinner} from "../components/ui/LoadingSpinner.tsx";

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

interface Answer {
    quiz_id: number;
    question_id: number;
    body: string;
}

interface QuizResult {
    title: string;
}

export const Quiz: React.FC = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [quiz, setQuiz] = useState<Quiz | null>(null);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [answers, setAnswers] = useState<Answer[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const [result, setResult] = useState<QuizResult | null>(null);

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

    const handleOptionSelect = (questionId: bigint, option: string) => {
        const questionIdNum = Number(questionId);
        const quizIdNum = Number(quiz?.id);

        // Check if an answer for this question already exists
        const existingAnswerIndex = answers.findIndex(
            (answer) => answer.question_id === questionIdNum
        );

        if (existingAnswerIndex !== -1) {
            // Update existing answer
            const updatedAnswers = [...answers];
            updatedAnswers[existingAnswerIndex] = {
                quiz_id: quizIdNum,
                question_id: questionIdNum,
                body: option
            };
            setAnswers(updatedAnswers);
        } else {
            // Add new answer
            setAnswers([
                ...answers,
                {
                    quiz_id: quizIdNum,
                    question_id: questionIdNum,
                    body: option
                }
            ]);
        }
    };

    const handleSubmit = async () => {
        if (!quiz) return;

        // Check if all questions have been answered
        if (answers.length !== questions.length) {
            alert('Please answer all questions before submitting.');
            return;
        }

        setSubmitting(true);

        try {
            const response = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/quiz/${id}/evaluate`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(answers)
                }
            );

            if (!response.ok) {
                throw new Error('Failed to submit answers');
            }

            const data = await response.json();
            // Make sure we're correctly extracting the result from the response
            if (data && data.result) {
                setResult(data.result);
                console.log("Result data:", data.result); // For debugging
            } else {
                throw new Error('Invalid result format from server');
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setSubmitting(false);
        }
    };

    const isQuestionAnswered = (questionId: bigint) => {
        return answers.some(answer => answer.question_id === Number(questionId));
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
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-6">
                    <strong className="font-bold">Error: </strong>
                    <span className="block sm:inline">{error}</span>
                </div>
            </Container>
        );
    }

    if (!quiz) {
        return (
            <Container>
                <div className="text-center py-10">
                    <h2 className="text-2xl font-bold text-gray-800">Quiz not found</h2>
                    <button
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        onClick={() => navigate('/')}
                    >
                        Back to Home
                    </button>
                </div>
            </Container>
        );
    }

    if (!questions || questions.length === 0) {
        return (
            <Container>
                <div className="text-center py-10">
                    <h2 className="text-2xl font-bold text-gray-800">{quiz.title}</h2>
                    <p className="mt-4 text-gray-600">No questions found for this quiz.</p>
                    <button
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        onClick={() => navigate('/')}
                    >
                        Back to Home
                    </button>
                </div>
            </Container>
        );
    }

    if (result) {
        return (
            <Container>
                <div className="max-w-2xl mx-auto my-8 p-6 bg-white rounded-lg shadow-lg">
                    <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Quiz Result</h1>

                    <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-100">

                        <h2 className="text-2xl font-semibold text-center mb-4 text-blue-800">
                            {JSON.stringify(result, null, 2)}
                        </h2>

                        <div className="flex flex-col items-center justify-center py-4">
                            <div className="text-blue-700 text-xl font-semibold">
                                Thank you for completing the quiz!
                            </div>
                            <p className="text-gray-600 mt-2 text-center">
                                Your result has been recorded.
                            </p>
                        </div>
                    </div>

                    <div className="text-center mt-8">
                        <button
                            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition font-medium"
                            onClick={() => navigate('/quizzes')}
                        >
                            Take Another Quiz
                        </button>
                    </div>
                </div>
            </Container>
        );
    }

    return (
        <Container>
            <div className="max-w-3xl mx-auto my-8">
                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="bg-blue-600 py-4 px-6">
                        <h1 className="text-2xl font-bold text-white">{quiz.title}</h1>
                    </div>

                    <div className="p-6">
                        <div className="space-y-8">
                            {questions.map((question, index) => (
                                <div key={index} className={`p-4 rounded-lg ${isQuestionAnswered(question.id) ? 'bg-blue-50' : 'bg-gray-50'}`}>
                                    <p className="text-lg font-medium mb-3">
                                        <span className="inline-block bg-blue-600 text-white rounded-full w-6 h-6 text-center mr-2">
                                            {index + 1}
                                        </span>
                                        {question.body}
                                    </p>
                                    <div className="space-y-2 ml-8">
                                        {question.options.map((option, optionIndex) => {
                                            const isSelected = answers.some(
                                                answer => answer.question_id === Number(question.id) && answer.body === option
                                            );

                                            return (
                                                <div
                                                    key={optionIndex}
                                                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                                                        isSelected
                                                            ? 'bg-blue-200 border-blue-400'
                                                            : 'hover:bg-gray-100 border-gray-200'
                                                    }`}
                                                    onClick={() => handleOptionSelect(question.id, option)}
                                                >
                                                    <div className="flex items-center">
                                                        <div className={`w-5 h-5 rounded-full border ${
                                                            isSelected
                                                                ? 'bg-blue-500 border-blue-500'
                                                                : 'border-gray-400'
                                                        } mr-3 flex items-center justify-center`}>
                                                            {isSelected && (
                                                                <div className="w-2 h-2 bg-white rounded-full"></div>
                                                            )}
                                                        </div>
                                                        <span>{option}</span>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 flex justify-end">
                            <button
                                className={`px-6 py-2 rounded-lg text-white font-medium ${
                                    answers.length === questions.length
                                        ? 'bg-blue-600 hover:bg-blue-700'
                                        : 'bg-gray-400 cursor-not-allowed'
                                } transition`}
                                onClick={handleSubmit}
                                disabled={answers.length !== questions.length || submitting}
                            >
                                {submitting ? 'Submitting...' : 'Submit Answers'}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mt-4 bg-blue-50 rounded-lg p-4">
                    <div className="flex items-center">
                        <div className="bg-blue-600 rounded-full p-2 text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <p className="ml-3 text-sm text-gray-700">
                            Answer all questions and click "Submit Answers" to see your results.
                        </p>
                    </div>
                </div>
            </div>
        </Container>
    );
};