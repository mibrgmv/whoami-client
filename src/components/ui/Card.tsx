import React from 'react';
import {Button} from './Button';

interface Props {
    name: string;
    description: string;
    buttonText: string;
    onClick: () => void;
}

export const Card: React.FC<Props> = ({name, description, buttonText, onClick}) => {
    return (
        <div className="p-6 rounded-lg shadow-md cursor-pointer hover:bg-gray-100">
            <h3 className="text-xl font-bold mb-2">{name}</h3>
            <p className="text-gray-600">{description}</p>
            <div className="mt-4">
                <Button text={buttonText} onClick={onClick}/>
            </div>
        </div>
    );
};