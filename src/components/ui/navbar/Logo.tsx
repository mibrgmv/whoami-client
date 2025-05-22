import React from "react";
import { Link as RouterLink } from "react-router-dom";

export const Logo: React.FC = () => {
  return (
    <RouterLink
      to="/"
      className="fixed py-2 px-4 top-3 left-5 bg-white text-3xl rounded-full"
    >
      $ whoami
    </RouterLink>
  );
};
