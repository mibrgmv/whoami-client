import React from 'react';
import {Button} from './Button';

interface Props {
    name: string;
    buttonText: string;
    onClick: () => void;
}

export const Card: React.FC<Props> = ({name, buttonText, onClick}) => {
    return (
        <div className="p-6 rounded-lg shadow-md cursor-pointer hover:bg-gray-100">
            <h3 className="text-xl font-bold">{name}</h3>
            <div className="mt-4">
                <Button text={buttonText} onClick={onClick}/>
            </div>
        </div>
    );
};