import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const Container: React.FC<Props> = ({ children }) => {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center">
      {children}
    </div>
  );
};
