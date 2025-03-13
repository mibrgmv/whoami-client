import React from 'react';

interface QuizNavigationProps {
    currentQuestionIndex: number;
    questionsLength: number;
    answersLength: number;
    submitting: boolean;
    handlePreviousQuestion: () => void;
    handleNextQuestion: () => void;
    handleSubmit: () => void;
}

export const QuizNavigation: React.FC<QuizNavigationProps> = ({
                                                                  currentQuestionIndex,
                                                                  questionsLength,
                                                                  answersLength,
                                                                  submitting,
                                                                  handlePreviousQuestion,
                                                                  handleNextQuestion,
                                                                  handleSubmit,
                                                              }) => {
    return (
        <div className="mt-8 flex justify-between">
            <button
                className={`px-4 py-2 rounded-lg text-white font-medium ${currentQuestionIndex > 0 ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'} transition`}
                onClick={handlePreviousQuestion}
                disabled={currentQuestionIndex === 0}
            >
                Previous
            </button>
            {currentQuestionIndex === questionsLength - 1 ? (
                <button
                    className={`px-6 py-2 rounded-lg text-white font-medium ${answersLength === questionsLength ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'} transition`}
                    onClick={handleSubmit}
                    disabled={answersLength !== questionsLength || submitting}
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
    );
};