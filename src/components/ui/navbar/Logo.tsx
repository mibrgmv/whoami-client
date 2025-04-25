import React from 'react';
import {Link as RouterLink} from 'react-router-dom';

interface LogoProps {
}

export const Logo: React.FC<LogoProps> = () => {
    return (
        <RouterLink to="/" className="fixed py-2 px-4 top-3 left-5 bg-white text-3xl rounded-full">
            ./whoami
        </RouterLink>
    );
};