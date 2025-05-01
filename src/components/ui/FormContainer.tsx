import React, { ReactNode } from "react";

type FormContainerProps = {
  children: ReactNode;
  title: string;
  subtitle?: string;
};

export const FormContainer: React.FC<FormContainerProps> = ({
  children,
  title,
  subtitle,
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="px-6 py-8 sm:p-10">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">{title}</h2>
            {subtitle && (
              <p className="mt-2 text-sm text-gray-600">{subtitle}</p>
            )}
          </div>
          <div className="mt-8">{children}</div>
        </div>
      </div>
    </div>
  );
};
