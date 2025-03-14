import React from "react";

interface FadeOverlayProps {
    isVisible: boolean;
    onClick: () => void;
}

export const FadeOverlay: React.FC<FadeOverlayProps> = ({isVisible, onClick}) => {
    return isVisible ? (
        <div
            className="fixed inset-0 bg-black opacity-25"
            onClick={onClick}
        />
    ) : null;
};