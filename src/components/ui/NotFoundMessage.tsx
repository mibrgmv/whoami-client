import React from 'react';
import {useNavigate} from 'react-router-dom';

interface NotFoundMessageProps {
    message: string;
    buttonText: string;
    navigateTo: string;
}

export const NotFoundMessage: React.FC<NotFoundMessageProps> = ({message, buttonText, navigateTo}) => {
    const navigate = useNavigate();

    return (
        <div className="text-center py-10">
            <h2 className="text-2xl font-bold text-gray-800">{message}</h2>
            <button
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:cursor-pointer hover:bg-blue-600"
                onClick={() => navigate(navigateTo)}
            >
                {buttonText}
            </button>
        </div>
    );
};