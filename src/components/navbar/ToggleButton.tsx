import React from "react";
import {FaBars, FaTimes} from "react-icons/fa";

interface ToggleButtonProps {
    nav: boolean;
    handleClick: () => void;
}

export const ToggleButton: React.FC<ToggleButtonProps> = ({ nav, handleClick }) => (
    <div onClick={handleClick} className="block z-10 cursor-pointer absolute top-8 right-8">
    {nav ? <FaTimes className="text-white" /> : <FaBars className="text-black" />}
    </div>
);