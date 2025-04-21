import React from "react";

interface Props {
    isVisible: boolean;
    onClick: () => void;
}

export const FadeOverlay: React.FC<Props> = ({isVisible, onClick}) => {
    if (!isVisible) return null;

    return (
        <div
            className="fixed inset-0 bg-black opacity-25"
            onClick={onClick}
        />
    );
};