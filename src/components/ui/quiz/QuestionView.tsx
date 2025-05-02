import React from "react";
import { Answer, Question } from "../../../shared/types";

interface QuestionViewProps {
  question: Question;
  answers: Answer[];
  handleOptionSelect: (questionId: string, option: string) => void;
}

export const QuestionView: React.FC<QuestionViewProps> = ({
  question,
  answers,
  handleOptionSelect,
}) => {
  return (
    <div className="space-y-2 ml-8">
      {question.options.map((option, optionIndex) => {
        const isSelected = answers.some(
          (answer) =>
            answer.question_id === question.id && answer.body === option,
        );

        return (
          <div
            key={optionIndex}
            className={`p-3 border rounded-lg cursor-pointer transition-colors ${isSelected ? "bg-blue-200 border-blue-400" : "hover:bg-gray-100 border-gray-200"}`}
            onClick={() => handleOptionSelect(question.id, option)}
          >
            <div className="flex items-center">
              <div
                className={`w-5 h-5 rounded-full border ${isSelected ? "bg-blue-500 border-blue-500" : "border-gray-400"} mr-3 flex items-center justify-center`}
              >
                {isSelected && (
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                )}
              </div>
              <span>{option}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
