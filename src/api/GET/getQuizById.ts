import { Endpoints } from "../endpoints.ts";
import { Quiz } from "../../shared/types";

export const getQuizById = async (
  quizId: string,
  fetch: (url: string, options: RequestInit) => Promise<Response>,
): Promise<Quiz | null> => {
  const response = await fetch(`${Endpoints.quizzes}/${quizId}`, {
    method: "GET",
  });

  if (response.status === 404) {
    return null;
  } else if (!response.ok) {
    throw new Error("Failed to fetch quiz");
  }

  return (await response.json()) as Quiz;
};
