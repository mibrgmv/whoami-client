import { Endpoints } from "../endpoints.ts";
import { Answer } from "../../shared/types/Answer.tsx";

interface EvaluateRequest {
  quizId: string;
  accessToken: string;
  answers: Answer[];
}

interface EvaluateResponse {
  result: string;
}

export const evaluate = async ({
  quizId,
  accessToken,
  answers,
}: EvaluateRequest) => {
  const url = `${Endpoints.getQuizzes}/${quizId}/evaluate`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      answers: answers,
      quiz_id: quizId,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to submit answers");
  }

  const data: EvaluateResponse = await response.json();
  return data;
};
