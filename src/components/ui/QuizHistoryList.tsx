import React from "react";
import { QuizHistoryItem } from "../../shared/types";

interface QuizHistoryListProps {
  historyItems: QuizHistoryItem[];
}

export const QuizHistoryList: React.FC<QuizHistoryListProps> = ({
  historyItems,
}) => {
  const thClass =
    "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider";
  const tdBase = "px-6 py-4 whitespace-nowrap text-sm";
  const tdClasses = {
    quizId: `${tdBase} text-gray-700`,
    result: `${tdBase} text-gray-700`,
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">
          Quiz Completion History
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Total records: {historyItems.length}
        </p>
      </div>

      {/* Desktop */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className={thClass}>Quiz ID</th>
              <th className={thClass}>Result</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {historyItems.length > 0 ? (
              historyItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className={tdClasses.quizId}>{item.quizId}</td>
                  <td className={tdClasses.result}>{item.quizResult}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={2}
                  className="px-6 py-4 text-center text-sm text-gray-500"
                >
                  No quiz history found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile */}
      <div className="md:hidden">
        {historyItems.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {historyItems.map((item) => (
              <div key={item.id} className="p-4 hover:bg-gray-50">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs font-medium text-gray-500 uppercase mb-1">
                      Quiz ID
                    </div>
                    <div className="text-sm text-gray-700">{item.quizId}</div>
                  </div>

                  <div>
                    <div className="text-xs font-medium text-gray-500 uppercase mb-1">
                      Result
                    </div>
                    <div className="text-sm text-gray-700">
                      {item.quizResult}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="px-6 py-4 text-center text-sm text-gray-500">
            No quiz history found
          </div>
        )}
      </div>
    </div>
  );
};
