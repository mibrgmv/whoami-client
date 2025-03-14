import React from 'react';
import {Link as RouterLink} from 'react-router-dom';

interface LogoProps {
}

export const Logo: React.FC<LogoProps> = () => {
    return (
        <RouterLink to="/" className="absolute top-6 left-8 text-3xl">
            ./whoami
        </RouterLink>
    );
};