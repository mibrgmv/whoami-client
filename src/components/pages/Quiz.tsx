import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container } from "../Container.tsx";
import {
  GeneralError,
  LoadingSpinner,
  NotFoundError,
  QuestionView,
  QuizNavigation,
  QuizProgress,
  ResultView,
} from "../ui";
import {
  useAuth,
  useEvaluateAnswers,
  useGetQuestionsByQuizId,
  useGetQuizById,
} from "../../hooks";
import { Answer, Question, Quiz, Result } from "../../shared/types";

export const QuizPage: React.FC = () => {
  const { quizId } = useParams();
  const { getQuiz } = useGetQuizById();
  const { evaluateAnswers } = useEvaluateAnswers();
  const { getQuestions } = useGetQuestionsByQuizId();
  const { authTokens, getAccessToken } = useAuth();
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
        setError("Quiz ID is not set");
        return;
      }

      if (!authTokens) {
        setLoading(false);
        setError("Not logged in");
        return;
      }

      try {
        const token = await getAccessToken();
        if (!token) {
          setLoading(false);
          setError("No token available");
          return;
        }

        const [quizResponse, questionsResponse] = await Promise.all([
          getQuiz(quizId),
          getQuestions(quizId),
        ]);

        setQuiz(quizResponse);
        setQuestions(questionsResponse.questions);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Failed to load quiz data.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchQuizAndQuestions();
  }, [quizId, getQuiz, getQuestions, authTokens, getAccessToken]);

  const handleOptionSelect = (questionId: string, option: string) => {
    const quizId = String(quiz?.id);

    const existingAnswerIndex = answers.findIndex(
      (answer) => answer.question_id === quiz?.id,
    );

    if (existingAnswerIndex !== -1) {
      const updatedAnswers = [...answers];
      updatedAnswers[existingAnswerIndex] = {
        quiz_id: quizId,
        question_id: questionId,
        body: option,
      };
      setAnswers(updatedAnswers);
    } else {
      setAnswers([
        ...answers,
        {
          quiz_id: quizId,
          question_id: questionId,
          body: option,
        },
      ]);
    }
  };

  const handleSubmit = async () => {
    if (!quiz) return;

    if (!authTokens) {
      setLoading(false);
      setError("Not logged in");
      return;
    }

    if (answers.length !== questions.length) {
      alert("Please answer all questions before submitting.");
      return;
    }

    setSubmitting(true);

    try {
      const token = await getAccessToken();
      if (!token) {
        setLoading(false);
        setError("No token available");
        return;
      }

      const result: Result = await evaluateAnswers({
        answers: answers,
        quiz_id: quiz.id,
      });

      setResult(result);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Failed to submit quiz results.");
      }
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
        <LoadingSpinner />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <GeneralError message={error} />
      </Container>
    );
  }

  if (!quiz) {
    return (
      <Container>
        <NotFoundError
          message="Quiz not found"
          buttonText="Back to Quizzes"
          navigateTo="/quizzes"
        />
      </Container>
    );
  }

  if (!questions || questions.length === 0) {
    return (
      <Container>
        <NotFoundError
          message="No questions found for this quiz"
          buttonText="Back to Quizzes"
          navigateTo="/quizzes"
        />
      </Container>
    );
  }

  if (result) {
    return (
      <Container>
        <ResultView result={result} />
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
        <QuizProgress
          currentQuestionIndex={currentQuestionIndex}
          questionsLength={questions.length}
        />
      </div>
    </Container>
  );
};
