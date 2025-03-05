import React from 'react';
import {Button} from "./Button.tsx";

interface ErrorModalProps {
    message: string;
    onClose: () => void;
}

export const ErrorModal: React.FC<ErrorModalProps> = ({message, onClose}) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="flex flex-col p-4 gap-6 bg-white justify-center items-center rounded-lg shadow-md">
                <p>{message}</p>
                <Button text="OK" onClick={onClose}></Button>
            </div>
        </div>
    );
};
