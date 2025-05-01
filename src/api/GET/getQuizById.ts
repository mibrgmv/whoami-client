import { Endpoints } from "../endpoints.ts";
import { Quiz } from "../../shared/types/Quiz.tsx";

export const getQuizById = async (
  quizId: string,
  fetch: (url: string, options: RequestInit) => Promise<Response>,
): Promise<Quiz | null> => {
  const quizResponse = await fetch(`${Endpoints.quizzes}/${quizId}`, {
    method: "GET",
  });

  if (quizResponse.status === 404) {
    return null;
  } else if (!quizResponse.ok) {
    throw new Error("Failed to fetch quiz");
  }

  const quizData: Quiz = await quizResponse.json();
  return quizData;
};
