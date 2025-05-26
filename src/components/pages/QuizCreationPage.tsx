import { useState } from "react";
import { useCreateQuiz, useCreateQuestions } from "../../hooks";
import { CreateQuestionRequest } from "../../api";

export const QuizCreationPage = () => {
  const { createQuiz } = useCreateQuiz();
  const { batchCreateQuestions } = useCreateQuestions();

  const [quizTitle, setQuizTitle] = useState("");
  const [results, setResults] = useState([""]);
  const [questions, setQuestions] = useState([
    { body: "", options: [{ text: "", weights: [""] }] },
  ]);
  const [loading, setLoading] = useState(false);
  const [createdQuizId, setCreatedQuizId] = useState("");

  const addResult = () => {
    setResults([...results, ""]);
  };

  const updateResult = (index: number, value: string) => {
    const newResults = [...results];
    newResults[index] = value;
    setResults(newResults);
  };

  const removeResult = (index: number) => {
    if (results.length > 1) {
      setResults(results.filter((_, i) => i !== index));
      // Update question weights to match new result count
      updateQuestionWeights(results.length - 1);
    }
  };

  const updateQuestionWeights = (newResultCount: number) => {
    setQuestions(
      questions.map((q) => ({
        ...q,
        options: q.options.map((opt) => ({
          ...opt,
          weights: Array(newResultCount)
            .fill("")
            .map((_, i) => opt.weights[i] || ""),
        })),
      })),
    );
  };

  const addQuestion = () => {
    const weightCount = results.filter((r) => r.trim() !== "").length;
    setQuestions([
      ...questions,
      {
        body: "",
        options: [{ text: "", weights: Array(weightCount).fill("") }],
      },
    ]);
  };

  const updateQuestion = (
    questionIndex: number,
    field: string,
    value: string,
  ) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex] = {
      ...newQuestions[questionIndex],
      [field]: value,
    };
    setQuestions(newQuestions);
  };

  const addOption = (questionIndex: number) => {
    const newQuestions = [...questions];
    const weightCount = results.filter((r) => r.trim() !== "").length;
    newQuestions[questionIndex].options.push({
      text: "",
      weights: Array(weightCount).fill(""),
    });
    setQuestions(newQuestions);
  };

  const updateOption = (
    questionIndex: number,
    optionIndex: number,
    field: string,
    value: string | string[],
  ) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options[optionIndex] = {
      ...newQuestions[questionIndex].options[optionIndex],
      [field]: value,
    };
    setQuestions(newQuestions);
  };

  const updateWeight = (
    questionIndex: number,
    optionIndex: number,
    weightIndex: number,
    value: string,
  ) => {
    const newQuestions = [...questions];
    const newWeights = [
      ...newQuestions[questionIndex].options[optionIndex].weights,
    ];
    newWeights[weightIndex] = value;
    newQuestions[questionIndex].options[optionIndex].weights = newWeights;
    setQuestions(newQuestions);
  };

  const removeOption = (questionIndex: number, optionIndex: number) => {
    const newQuestions = [...questions];
    if (newQuestions[questionIndex].options.length > 1) {
      newQuestions[questionIndex].options = newQuestions[
        questionIndex
      ].options.filter((_, i) => i !== optionIndex);
      setQuestions(newQuestions);
    }
  };

  const removeQuestion = (questionIndex: number) => {
    if (questions.length > 1) {
      setQuestions(questions.filter((_, i) => i !== questionIndex));
    }
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      // Create quiz first
      const quiz = await createQuiz(
        quizTitle,
        results.filter((r) => r.trim() !== ""),
      );
      setCreatedQuizId(quiz.id);

      // Prepare questions for batch creation
      const questionRequests: CreateQuestionRequest[] = questions.map((q) => ({
        quiz_id: quiz.id,
        body: q.body,
        options_weights: q.options.reduce(
          (acc, opt) => {
            acc[opt.text] = {
              weights: opt.weights.map((w) => parseInt(w) || 0),
            };
            return acc;
          },
          {} as Record<string, { weights: number[] }>,
        ),
      }));

      // Create questions
      await batchCreateQuestions(quiz.id, questionRequests);

      alert("Quiz created successfully!");
    } catch (error) {
      console.error("Error creating quiz:", error);
      alert("Error creating quiz. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const validResults = results.filter((r) => r.trim() !== "");

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Create Quiz</h1>

      <div className="space-y-6">
        {/* Quiz Title */}
        <div>
          <label className="block text-sm font-medium mb-2">Quiz Title</label>
          <input
            type="text"
            value={quizTitle}
            onChange={(e) => setQuizTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        {/* Results */}
        <div>
          <label className="block text-sm font-medium mb-2">Quiz Results</label>
          {results.map((result, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={result}
                onChange={(e) => updateResult(index, e.target.value)}
                className="flex-1 p-2 border border-gray-300 rounded"
                placeholder={`Result ${index + 1}`}
                required
              />
              <button
                type="button"
                onClick={() => removeResult(index)}
                className="px-3 py-2 bg-red-500 text-white rounded"
                disabled={results.length === 1}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addResult}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Add Result
          </button>
        </div>

        {/* Questions */}
        <div>
          <label className="block text-sm font-medium mb-2">Questions</label>
          {questions.map((question, questionIndex) => (
            <div
              key={questionIndex}
              className="border border-gray-200 p-4 rounded mb-4"
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-medium">Question {questionIndex + 1}</h3>
                <button
                  type="button"
                  onClick={() => removeQuestion(questionIndex)}
                  className="px-2 py-1 bg-red-500 text-white rounded text-sm"
                  disabled={questions.length === 1}
                >
                  Remove Question
                </button>
              </div>

              <input
                type="text"
                value={question.body}
                onChange={(e) =>
                  updateQuestion(questionIndex, "body", e.target.value)
                }
                className="w-full p-2 border border-gray-300 rounded mb-3"
                placeholder="Question text"
                required
              />

              {/* Options */}
              <div className="space-y-3">
                <h4 className="font-medium">Options</h4>
                {question.options.map((option, optionIndex) => (
                  <div
                    key={optionIndex}
                    className="border border-gray-100 p-3 rounded"
                  >
                    <div className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={option.text}
                        onChange={(e) =>
                          updateOption(
                            questionIndex,
                            optionIndex,
                            "text",
                            e.target.value,
                          )
                        }
                        className="flex-1 p-2 border border-gray-300 rounded"
                        placeholder={`Option ${optionIndex + 1}`}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => removeOption(questionIndex, optionIndex)}
                        className="px-2 py-1 bg-red-500 text-white rounded text-sm"
                        disabled={question.options.length === 1}
                      >
                        Remove
                      </button>
                    </div>

                    {/* Weights */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                      {validResults.map((result, weightIndex) => (
                        <div key={weightIndex} className="flex flex-col">
                          <label className="text-xs text-gray-600 mb-1">
                            {result}
                          </label>
                          <input
                            type="number"
                            value={option.weights[weightIndex] || ""}
                            onChange={(e) =>
                              updateWeight(
                                questionIndex,
                                optionIndex,
                                weightIndex,
                                e.target.value,
                              )
                            }
                            className="p-1 border border-gray-300 rounded text-sm"
                            placeholder="Weight"
                            required
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addOption(questionIndex)}
                  className="px-3 py-1 bg-green-500 text-white rounded text-sm"
                >
                  Add Option
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addQuestion}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Add Question
          </button>
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={
            loading ||
            !quizTitle ||
            validResults.length === 0 ||
            questions.some((q) => !q.body)
          }
          className="w-full px-4 py-2 bg-green-600 text-white rounded disabled:bg-gray-400"
        >
          {loading ? "Creating Quiz..." : "Create Quiz"}
        </button>
      </div>

      {createdQuizId && (
        <div className="mt-4 p-4 bg-green-100 rounded">
          <p>Quiz created successfully! ID: {createdQuizId}</p>
        </div>
      )}
    </div>
  );
};
