import React from 'react';
import {useNavigate} from 'react-router-dom';
import {Result} from "../../../shared/types/Result.tsx";

interface ResultViewProps {
    result: Result;
}

export const ResultView: React.FC<ResultViewProps> = ({result}) => {
    const navigate = useNavigate();

    return (
        <div className="max-w-2xl mx-auto my-8 p-6 bg-white rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Quiz Result</h1>

            <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-100">
                <h2 className="text-2xl font-semibold text-center mb-4 text-blue-800">
                    Your result: {JSON.stringify(result.result, null, 2)}
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
                    className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:cursor-pointer hover:bg-blue-600 transition font-medium"
                    onClick={() => navigate('/quizzes')}
                >
                    Take Another Quiz
                </button>
            </div>
        </div>
    );
};