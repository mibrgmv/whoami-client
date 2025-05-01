import { Quiz } from "../../shared/types/Quiz.tsx";
import { Endpoints } from "../endpoints.ts";

export interface CreateQuizRequest {
  title: string;
  results: string[];
  image_url?: string;
}

export const createQuiz = async (
  quizData: CreateQuizRequest,
  fetch: (url: string, options: RequestInit) => Promise<Response>,
): Promise<Quiz> => {
  const response = await fetch(Endpoints.quizzes, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(quizData),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(
      errorData?.message || `Failed to create quiz: ${response.status}`,
    );
  }

  return await response.json();
};
