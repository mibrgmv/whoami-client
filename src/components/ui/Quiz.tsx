import React from 'react';
import {Button} from './Button';

interface Props {
    name: string;
    description: string;
    onClick: () => void;
}

export const Quiz: React.FC<Props> = ({name, description, onClick}) => {
    return (
        <div
            className="quiz-card p-6 rounded-lg shadow-md cursor-pointer hover:bg-gray-100"
            onClick={onClick}
        >
            <h3 className="quiz-name text-xl font-bold mb-2">{name}</h3>
            <p className="quiz-description text-gray-600">{description}</p>
            <div className="mt-4">
                <Button text="Start Quiz"/>
            </div>
        </div>
    );
};