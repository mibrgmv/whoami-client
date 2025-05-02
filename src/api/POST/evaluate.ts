import { Endpoints } from "../endpoints.ts";
import { Answer } from "../../shared/types/Answer.tsx";

export interface EvaluateAnswersRequest {
  answers: Answer[];
  quiz_id: string;
}

export interface EvaluateAnswersResponse {
  result: string;
}

export const evaluateAnswers = async (
  request: EvaluateAnswersRequest,
  fetch: (url: string, options: RequestInit) => Promise<Response>,
): Promise<EvaluateAnswersResponse> => {
  const url = `${Endpoints.quizzes}/${request.quiz_id}/evaluate`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error(
      `Failed to evaluate answers: ${response.status} ${response.statusText}`,
    );
  }

  return (await response.json()) as EvaluateAnswersResponse;
};
