import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {Container} from "../components/Container.tsx";
import {LoadingSpinner} from "../components/ui/LoadingSpinner.tsx";
import {NotFoundMessage} from "../components/ui/NotFoundMessage.tsx";
import {ErrorMessage} from "../components/ui/ErrorMessage.tsx";
import {ResultView} from "../views/ResultView.tsx";
import {QuestionView} from "../views/QuestionView.tsx";
import {QuizNavigation} from "../views/QuizNavigation.tsx";
import {QuizProgress} from "../views/QuizProgress.tsx";
import {Quiz} from "../shared/Quiz.tsx";
import {Question} from "../shared/Question.tsx";
import {Answer} from "../shared/Answer.tsx";

interface QuizResult {
    title: string;
}

export const QuizPage: React.FC = () => {
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
                        <QuestionView
                            question={currentQuestion}
                            answers={answers}
                            handleOptionSelect={handleOptionSelect}
                        />
                        <QuizNavigation
                            currentQuestionIndex={currentQuestionIndex}
                            questionsLength={questions.length}
                            answersLength={answers.length}
                            submitting={submitting}
                            handlePreviousQuestion={handlePreviousQuestion}
                            handleNextQuestion={handleNextQuestion}
                            handleSubmit={handleSubmit}
                        />
                    </div>
                </div>
                <QuizProgress currentQuestionIndex={currentQuestionIndex} questionsLength={questions.length}/>
            </div>
        </Container>
    );
};