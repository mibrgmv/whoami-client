import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {Container} from "../components/Container.tsx";
import {LoadingSpinner} from "../components/ui/LoadingSpinner.tsx";
import {NotFoundMessage} from "../components/ui/NotFoundMessage.tsx";
import {ErrorMessage} from "../components/ui/ErrorMessage.tsx";
import {ResultView} from "../components/ui/ResultView.tsx";

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
    const [quiz, setQuiz] = useState<Quiz | null>(null);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [answers, setAnswers] = useState<Answer[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const [result, setResult] = useState<QuizResult | null>(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

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

        const existingAnswerIndex = answers.findIndex(
            (answer) => answer.question_id === questionIdNum
        );

        if (existingAnswerIndex !== -1) {
            const updatedAnswers = [...answers];
            updatedAnswers[existingAnswerIndex] = {
                quiz_id: quizIdNum,
                question_id: questionIdNum,
                body: option
            };
            setAnswers(updatedAnswers);
        } else {
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
            if (data && data.result) {
                setResult(data.result);
            } else {
                throw new Error('Invalid result format from server');
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setSubmitting(false);
        }
    };

    // const isQuestionAnswered = (questionId: bigint) => {
    //     return answers.some(answer => answer.question_id === Number(questionId));
    // };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
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

    if (!quiz) {
        return (
            <Container>
                <NotFoundMessage message="Quiz not found"
                                 buttonText="Back to Quizzes"
                                 navigateTo="/quizzes"/>
            </Container>
        );
    }

    if (!questions || questions.length === 0) {
        return (
            <Container>
                <NotFoundMessage message="No questions found for this quiz"
                                 buttonText="Back to Quizzes"
                                 navigateTo="/quizzes"/>
            </Container>
        );
    }

    if (result) {
        return (
            <Container>
                <ResultView result={result}/>
            </Container>
        );
    }

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <Container>
            <div className="max-w-3xl mx-auto my-8">
                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="bg-blue-600 py-4 px-6">
                        <h1 className="text-2xl font-bold text-white">{quiz.title}</h1>
                    </div>

                    <div className="p-6">
                        <p className="text-lg font-medium mb-3">
                            <span className="inline-block bg-blue-600 text-white rounded-full w-6 h-6 text-center mr-2">
                                {currentQuestionIndex + 1}
                            </span>
                            {currentQuestion.body}
                        </p>
                        <div className="space-y-2 ml-8">
                            {currentQuestion.options.map((option, optionIndex) => {
                                const isSelected = answers.some(
                                    answer => answer.question_id === Number(currentQuestion.id) && answer.body === option
                                );

                                return (
                                    <div
                                        key={optionIndex}
                                        className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                                            isSelected
                                                ? 'bg-blue-200 border-blue-400'
                                                : 'hover:bg-gray-100 border-gray-200'
                                        }`}
                                        onClick={() => handleOptionSelect(currentQuestion.id, option)}
                                    >
                                        <div className="flex items-center">
                                            <div className={`w-5 h-5 rounded-full border ${
                                                isSelected
                                                    ? 'bg-blue-500 border-blue-500'
                                                    : 'border-gray-400'
                                            } mr-3 flex items-center justify-center`}>
                                                {isSelected
                                                    && (
                                                        <div className="w-2 h-2 bg-white rounded-full"></div>
                                                    )}
                                            </div>
                                            <span>{option}</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="mt-8 flex justify-between">
                            <button
                                className={`px-4 py-2 rounded-lg text-white font-medium ${currentQuestionIndex > 0 ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'} transition`}
                                onClick={handlePreviousQuestion}
                                disabled={currentQuestionIndex === 0}
                            >
                                Previous
                            </button>
                            {currentQuestionIndex === questions.length - 1 ? (
                                <button
                                    className={`px-6 py-2 rounded-lg text-white font-medium ${answers.length === questions.length ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'} transition`}
                                    onClick={handleSubmit}
                                    disabled={answers.length !== questions.length || submitting}
                                >
                                    {submitting ? 'Submitting...' : 'Submit Answers'}
                                </button>
                            ) : (
                                <button
                                    className="px-4 py-2 rounded-lg text-white font-medium bg-blue-600 hover:bg-blue-700 transition"
                                    onClick={handleNextQuestion}
                                >
                                    Next
                                </button>
                            )}
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
                            Question {currentQuestionIndex + 1} of {questions.length}. Answer all questions and click "Submit Answers" to see your results.
                        </p>
                    </div>
                </div>
            </div>
        </Container>
    );
};