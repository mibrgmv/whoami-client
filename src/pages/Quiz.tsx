import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {Container} from "../components/Container.tsx";
import {LoadingSpinner} from "../components/ui/LoadingSpinner.tsx";
import {NotFoundMessage} from "../components/ui/NotFoundMessage.tsx";
import {ErrorMessage} from "../components/ui/ErrorMessage.tsx";
import {QuestionView} from "../components/ui/quiz/QuestionView.tsx";
import {QuizNavigation} from "../components/ui/quiz/QuizNavigation.tsx";
import {QuizProgress} from "../components/ui/quiz/QuizProgress.tsx";
import {Quiz} from "../shared/types/Quiz.tsx";
import {Question} from "../shared/types/Question.tsx";
import {Answer} from "../shared/types/Answer.tsx";
import {Result} from "../shared/types/Result.tsx";
import {ResultView} from "../components/ui/quiz/ResultView.tsx";
import {useAuth} from "../AuthContext.tsx";
import {getQuestionsByQuizId} from "../api/GET/getQuestionsByQuizId.ts";
import {getQuizById} from "../api/GET/quizById.ts";
import {evaluate} from "../api/POST/evaluate.ts";

export const QuizPage: React.FC = () => {
    const {quizId} = useParams();
    const {loginData} = useAuth();
    const [quiz, setQuiz] = useState<Quiz | null>(null);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [answers, setAnswers] = useState<Answer[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const [result, setResult] = useState<Result | null>(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    useEffect(() => {
        const fetchQuizAndQuestions = async () => {
            if (!quizId) {
                setLoading(false);
                setError('Quiz ID is not set');
                return;
            }

            if (!loginData) {
                setLoading(false);
                setError('Not logged in');
                return;
            }

            try {
                const [quizResponse, questionsResponse] = await Promise.all([
                    getQuizById(quizId, loginData),
                    getQuestionsByQuizId({quizId: quizId, loginData: loginData}),
                ]);
                setQuiz(quizResponse);
                setQuestions(questionsResponse.questions);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchQuizAndQuestions();
    }, [quizId, loginData]);

    const handleOptionSelect = (questionId: string, option: string) => {
        const quizId = String(quiz?.id);

        const existingAnswerIndex = answers.findIndex(
            (answer) => answer.question_id === quiz?.id
        );

        if (existingAnswerIndex !== -1) {
            const updatedAnswers = [...answers];
            updatedAnswers[existingAnswerIndex] = {
                quiz_id: quizId,
                question_id: questionId,
                body: option
            };
            setAnswers(updatedAnswers);
        } else {
            setAnswers([
                ...answers,
                {
                    quiz_id: quizId,
                    question_id: questionId,
                    body: option
                }
            ]);
        }
    };

    const handleSubmit = async () => {
        if (!quiz)
            return;

        if (!loginData) {
            setLoading(false);
            setError('Not logged in');
            return;
        }

        if (answers.length !== questions.length) {
            alert('Please answer all questions before submitting.');
            return;
        }

        setSubmitting(true);

        try {
            const result: Result = await evaluate({quizId: quiz.id, answers: answers, loginData: loginData})
            setResult(result);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setSubmitting(false);
        }
    };

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
                                 navigateTo="/quizzes"
                />
            </Container>
        );
    }

    if (!questions || questions.length === 0) {
        return (
            <Container>
                <NotFoundMessage message="No questions found for this quiz"
                                 buttonText="Back to Quizzes"
                                 navigateTo="/quizzes"
                />
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