import React from "react";
import {FaBars, FaTimes} from "react-icons/fa";

interface ToggleButtonProps {
    nav: boolean;
    handleClick: () => void;
}

export const ToggleButton: React.FC<ToggleButtonProps> = ({nav, handleClick}) => (
    <div onClick={handleClick} className="z-10 cursor-pointer fixed top-8 right-8 text-black">
        {nav ? <FaTimes/> : <FaBars/>}
    </div>
);