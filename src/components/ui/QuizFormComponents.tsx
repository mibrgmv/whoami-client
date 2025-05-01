import React from "react";
import {LoadingSpinner} from "./LoadingSpinner.tsx";

interface QuizFormContainerProps {
  children: React.ReactNode;
}

export const QuizFormContainer: React.FC<QuizFormContainerProps> = ({
  children,
}) => {
  return (
    <div className="min-h-screen pt-20 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto overflow-y-auto">
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {children}
      </div>
    </div>
  );
};

interface FormHeaderProps {
  title: string;
  description: string;
}

export const FormHeader: React.FC<FormHeaderProps> = ({
  title,
  description,
}) => {
  return (
    <div className="px-6 py-4 border-b border-gray-200">
      <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      <p className="text-sm text-gray-500 mt-1">{description}</p>
    </div>
  );
};

interface TextFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  disabled?: boolean;
}

export const TextField: React.FC<TextFieldProps> = ({
  id,
  label,
  value,
  onChange,
  placeholder,
  disabled = false,
}) => {
  return (
    <div className="mb-6">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <input
        type="text"
        id={id}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        placeholder={placeholder}
        disabled={disabled}
      />
    </div>
  );
};

interface ImageUploadProps {
  imagePreview: string | null;
  selectedImage: File | null;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  imagePreview,
  selectedImage,
  onImageChange,
  disabled = false,
}) => {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Quiz Image (optional)
      </label>

      <div className="mt-2 flex items-center">
        <div className="flex-shrink-0">
          {imagePreview ? (
            <div className="h-32 w-32 rounded-md overflow-hidden bg-gray-100">
              <img
                src={imagePreview}
                alt="Quiz preview"
                className="h-full w-full object-cover"
              />
            </div>
          ) : (
            <div className="h-32 w-32 rounded-md overflow-hidden border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50">
              <svg
                className="h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          )}
        </div>
        <div className="ml-5">
          <label
            htmlFor="image-upload"
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
          >
            {selectedImage ? "Change Image" : "Upload Image"}
          </label>
          <input
            id="image-upload"
            name="image"
            type="file"
            className="sr-only"
            onChange={onImageChange}
            accept="image/*"
            disabled={disabled}
          />
          {selectedImage && (
            <p className="mt-2 text-xs text-gray-500">{selectedImage.name}</p>
          )}
        </div>
      </div>
    </div>
  );
};

interface ResultsListProps {
  results: string[];
  onResultChange: (index: number, value: string) => void;
  onAddResult: () => void;
  onRemoveResult: (index: number) => void;
  disabled?: boolean;
}

export const ResultsList: React.FC<ResultsListProps> = ({
  results,
  onResultChange,
  onAddResult,
  onRemoveResult,
  disabled = false,
}) => {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <label className="block text-sm font-medium text-gray-700">
          Possible Results
        </label>
        <button
          type="button"
          onClick={onAddResult}
          className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          disabled={disabled}
        >
          Add Result
        </button>
      </div>

      <div className="space-y-3">
        {results.map((result, index) => (
          <div key={index} className="flex items-center">
            <input
              type="text"
              value={result}
              onChange={(e) => onResultChange(index, e.target.value)}
              className="flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder={`Result ${index + 1}`}
              disabled={disabled}
            />
            <button
              type="button"
              onClick={() => onRemoveResult(index)}
              className="ml-2 p-1 text-gray-400 hover:text-red-500 focus:outline-none"
              disabled={disabled || results.length <= 2}
              aria-label="Remove"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

interface FormActionsProps {
  onCancel: () => void;
  isSubmitting: boolean;
}

export const FormActions: React.FC<FormActionsProps> = ({
  onCancel,
  isSubmitting,
}) => {
  return (
    <div className="mt-8 flex justify-end">
      <button
        type="button"
        onClick={onCancel}
        className="mr-3 px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        disabled={isSubmitting}
      >
        Cancel
      </button>
      <button
        type="submit"
        className="px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <LoadingSpinner size="large" />
            Creating...
          </>
        ) : (
          "Create Quiz"
        )}
      </button>
    </div>
  );
};
