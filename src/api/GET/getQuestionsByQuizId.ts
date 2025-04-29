import { Question } from "../../shared/types/Question.tsx";
import { Endpoints } from "../endpoints.ts";

export interface GetQuestionsByQuizIdResponse {
  questions: Question[];
}

export const getQuestionsByQuizId = async (
  quizId: string,
  accessToken: string,
): Promise<GetQuestionsByQuizIdResponse> => {
  const url = `${Endpoints.getQuizzes}/${quizId}/questions`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch questions for quiz: ${response.status} ${response.statusText}`,
    );
  }

  const reader = response.body?.getReader();
  if (!reader) {
    throw new Error("Response body is not readable");
  }

  const questions: Question[] = [];
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });

    while (buffer.includes("\n")) {
      const newlineIndex = buffer.indexOf("\n");
      const line = buffer.substring(0, newlineIndex).trim();
      buffer = buffer.substring(newlineIndex + 1);

      if (line) {
        try {
          const parsedLine = JSON.parse(line);
          if (parsedLine && parsedLine.result) {
            const questionData = parsedLine.result;
            const question: Question = {
              id: questionData.id,
              quiz_id: questionData.quizId,
              body: questionData.body,
              options: questionData.options,
            };
            questions.push(question);
          }
        } catch (e) {
          console.error("Error parsing JSON from stream:", e);
        }
      }
    }
  }

  return { questions };
};
